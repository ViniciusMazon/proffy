import React, { useState, useEffect } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import logoffIcon from '../../assets/images/icons/logoff.png';
import api from '../../services/api';

interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}


function Landing() {
  const { navigate } = useNavigation();

  const [token, setToken] = useState('');
  const [user, setUser] = useState<IUser>();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function getTotalConnections() {
      const token = await AsyncStorage.getItem('proffy_token');
      const response = await api.get('/connections', { headers: { authorization: token } });
      if (response.status === 200) {
        setTotalConnections(response.data.total);
      }
    }

    async function getStoragedUserData() {
      const data = await AsyncStorage.getItem('proffy_user');
      const userData = JSON.parse(String(data));
      const tokenData = await AsyncStorage.getItem('proffy_token');
      if (tokenData && userData) {
        setToken(tokenData);
        setUser(userData);
      }
    }

    getStoragedUserData();
    getTotalConnections();
  }, []);


  async function handleLogoff() {
    await AsyncStorage.removeItem('proffy_remember');
    await AsyncStorage.removeItem('proffy_token');
    navigate('Login');
  }

  function handleNavigateToProfilePage() {
    navigate('Profile', { user, token });
  }

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses', { user, token });
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <RectButton
          style={styles.profileContainer}
          onPress={handleNavigateToProfilePage}
        >
          <Image
            source={{ uri: user?.avatar }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{user?.name} {user?.surname}</Text>
        </RectButton>
        <RectButton
          style={styles.logoffButton}
          onPress={handleLogoff}
        >
          <Image source={logoffIcon} style={styles.logoffButtonIcon} />
        </RectButton>
      </View>

      <Image source={landingImg} style={styles.banner} />

      <View style={styles.footer}>
        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleNavigateToStudyPages}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>
          <RectButton
            onPress={handleNavigateToGiveClassesPage}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>
        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas {' '}
          <Image source={heartIcon} />
        </Text>
      </View>
    </View>
  );
}

export default Landing;
