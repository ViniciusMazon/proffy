import React, { useState } from 'react';
import { Image, Text, View, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import longRightArrowIcon from '../../assets/images/icons/next.png';

import styles from './styles';
import api from '../../services/api';

interface Schedule {
  weekDay: string;
  from: string;
  to: string;
}
export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  surname: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  schedule: Array<Schedule>;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsApp() {
    api.post('/connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = []
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      });
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container} >
      <View style={styles.profile}>
        <Image style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      {/* <View style={styles.schedule}>
        <View style={styles.scheduleLegend}>
          <Text style={styles.scheduleLegendText}>Dia</Text>
          <Text style={styles.scheduleLegendText}>Horário</Text>
        </View>
        {teacher.schedule.map(item => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>{item.weekDay}</Text>
            <Image source={longRightArrowIcon} />
            <Text style={styles.scheduleText}>{item.from}h - {item.to}h</Text>
          </View>
        ))}
      </View> */}

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço da minha hora: {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost} reais</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
          >
            {isFavorited ?
              <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton onPress={handleLinkToWhatsApp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View >
  );
}

export default TeacherItem;
