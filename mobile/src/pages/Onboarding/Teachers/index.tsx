import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import studyIcon from '../../../assets/images/icons/study.png';
import background from '../../../assets/images/give-classes-background.png';
import nextIcon from '../../../assets/images/icons/next.png';
import styles from './styles';

function Teachers() {
  const { navigate } = useNavigation();

  useEffect(() => {
    async function init() {
      const isFirstBoot = await AsyncStorage.getItem('proffy_isFirstBoot');
      if (isFirstBoot) {
        navigate('Login');
      } else {
        await AsyncStorage.setItem('proffy_isFirstBoot', 'false');
      }
    }

    init();
  }, []);

  function handleNavigateNext() {
    navigate('Classes');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={background}
        style={[styles.banner, { backgroundColor: '#8257E5' }]}
      >
        <Image source={studyIcon} style={styles.logo} />
      </ImageBackground>
      <Text style={styles.number}>01.</Text>
      <Text style={styles.title}>Encontre vários professores para ensinar você.</Text>
      <View style={styles.footer}>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, { backgroundColor: '#8257E5' }]} />
          <View style={[styles.dot, { backgroundColor: '#C1BCCC' }]} />
        </View>
        <RectButton style={styles.linkButton} onPress={handleNavigateNext}>
          <Image source={nextIcon} />
        </RectButton>
      </View>
    </View>
  );
}

export default Teachers;
