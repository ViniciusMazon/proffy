import React from 'react';
import { ImageBackground, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backgroundImg from '../../assets/images/give-classes-background.png';
import successImg from '../../assets/images/icons/success.png'

import styles from './styles';

interface SuccessPageProps {
  title: string;
  message: string;
  redirectTo: string;
  buttonText: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ title, message, redirectTo, buttonText }) => {
  const { navigate } = useNavigation();

  function handleNavigateToLogin() {
    navigate(redirectTo);
  }

  return (
    <ImageBackground
      resizeMode="contain"
      source={backgroundImg}
      style={styles.container}
    >
      <Image source={successImg} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{message}</Text>
      <RectButton style={styles.okButton} onPress={handleNavigateToLogin}>
        <Text style={styles.okButtonText}>{buttonText}</Text>
      </RectButton>
    </ImageBackground>
  );
}

export default SuccessPage;
