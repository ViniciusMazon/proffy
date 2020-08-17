import React from 'react';
import { ImageBackground, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backgroundImg from '../../assets/images/give-classes-background.png';
import successImg from '../../assets/images/icons/success.png'

import styles from './styles';

function ForgotPasswordSuccess() {
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
      <Text style={styles.title}>Redefinição enviada!</Text>
      <Text style={styles.description}>Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.</Text>
      <RectButton style={styles.okButton} onPress={handleNavigateToLogin}>
        <Text style={styles.okButtonText}>Voltar ao login</Text>
      </RectButton>
    </ImageBackground>
  );
}

export default ForgotPasswordSuccess;
