import React from 'react';
import { View, Text, ImageBackground, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';
import backIcon from '../../assets/images/icons/back.png';
import background from '../../assets/images/background.png';

import styles from './styles';

function ForgotPassword() {
  const { navigate, goBack } = useNavigation();

  function handlerNavigateBack() {
    goBack();
  }

  function handleNavigateToForgotPasswordSuccess() {
    navigate('ForgotPasswordSuccess');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={background}
        style={styles.banner}
      >
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.description}>Sua pataforma de estudos online</Text>
      </ImageBackground>

      <View style={{
        paddingHorizontal: 20,
        paddingBottom: 16
      }}>
        <RectButton style={styles.linkButton} onPress={handlerNavigateBack}>
          <Image source={backIcon} />
        </RectButton>
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.subtitle}>Não esquenta, {'\n'}vamos dar um jeito nisso.</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#C1BCCC"
        />

        <RectButton style={styles.okButton} onPress={handleNavigateToForgotPasswordSuccess}>
          <Text style={styles.okButtonText}>Enviar</Text>
        </RectButton>
      </View>
    </View>
  )
}

export default ForgotPassword;
