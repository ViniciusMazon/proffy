import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import giveClassesIcon from '../../../assets/images/icons/give-classes.png';
import background from '../../../assets/images/give-classes-background.png';
import nextIcon from '../../../assets/images/icons/next.png';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

function Classes() {
  const { navigate } = useNavigation();

  function handleNavigateNext() {
    navigate('Login');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={background}
        style={[styles.banner, { backgroundColor: '#04D361' }]}
      >
        <Image source={giveClassesIcon} style={styles.logo} />
      </ImageBackground>
      <Text style={styles.number}>02.</Text>
      <Text style={styles.title}>Ou dê aulas sobre o que você mais conhece</Text>
      <View style={styles.footer}>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, { backgroundColor: '#C1BCCC' }]} />
          <View style={[styles.dot, { backgroundColor: '#8257E5' }]} />
        </View>
        <RectButton style={styles.linkButton} onPress={handleNavigateNext}>
          <Image source={nextIcon} />
        </RectButton>
      </View>
    </View>
  );
}

export default Classes;
