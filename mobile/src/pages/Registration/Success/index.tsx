import React from 'react';
import { ImageBackground, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backgroundImg from '../../../assets/images/give-classes-background.png';
import successImg from '../../../assets/images/icons/success.png'

import styles from './styles';

function Success() {
  const { navigate } = useNavigation();

  function handleNavigateToLogin() {
    navigate('Login');
  }

  return (
    <ImageBackground
      resizeMode="contain"
      source={backgroundImg}
      style={styles.container}
    >
      <Image source={successImg} style={styles.icon} />
      <Text style={styles.title}>Cadastro concluído!</Text>
      <Text style={styles.description}>Agora você faz parte da plataforma da Proffy</Text>
      <RectButton style={styles.okButton} onPress={handleNavigateToLogin}>
        <Text style={styles.okButtonText}>Concluir cadastro</Text>
      </RectButton>
    </ImageBackground>
  );
}

export default Success;
