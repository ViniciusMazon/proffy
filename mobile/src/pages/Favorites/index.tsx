import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import favoriteIcon from '../../assets/images/icons/favorite.png';
import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      subject: 'Inglês',
      cost: '20',
      name: 'Vinicius',
      surname: 'Mazon',
      avatar: 'https://github.com/viniciusmazon.png',
      whatsapp: '77 99999999',
      bio: 'Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
      schedule: [{
        weekDay: 'Segunda',
        from: '8',
        to: '18',
      },
      {
        weekDay: 'Quarta',
        from: '8',
        to: '18',
      }]
    }
  ]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader
      name="Estudar"
      title="Meus proffys Favoritos"
      icon={favoriteIcon}
      iconText="1 proffy"
      />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
