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

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('proffy_token');
      const response = await api.get('/connections', { headers: { authorization: token } });
      if (response.status === 200) {
        setTotalConnections(response.data.total);
      }
    }

    init();
  }, []);


  async function handleLogoff() {
    await AsyncStorage.removeItem('proffy_remember');
    await AsyncStorage.removeItem('proffy_token');
    navigate('Login');
  }

  function handleNavigateToProfilePage() {
    navigate('Profile');
  }

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
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
            source={{ uri: "https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4" }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Vinicius Mazon</Text>
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
