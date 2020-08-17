import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import background from '../../assets/images/give-classes-background.png';
import nextIcon from '../../assets/images/icons/next.png';
import styles from './styles';

function Onboarding() {
  const { navigate } = useNavigation();

  function handleNavigateToNextPage(index: number) {
    if (index === 2) {
      navigate('Login');
    }
  }

  return (
    <ViewPager
      style={styles.container}
      initialPage={0}
      onPageScroll={(e) => handleNavigateToNextPage(e.nativeEvent.position)}
    >
      <View key="1">
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
          <Image source={nextIcon} />
        </View>
      </View>

      <View key="2">
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
          <Image source={nextIcon} />
        </View>
      </View>

      <View key="3" />
    </ViewPager>
  );
}

export default Onboarding;
