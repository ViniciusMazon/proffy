import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';
import backIcon from '../../assets/images/icons/back.png';
import background from '../../assets/images/background.png';

import styles from './styles';
import api from '../../services/api';

function ForgotPassword() {
  const { navigate, goBack } = useNavigation();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (email) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email]);


  function handlerNavigateBack() {
    goBack();
  }

  async function handleNavigateToForgotPasswordSuccess() {
    if (!email) {
      return
    };
    try {
      console.log(email)
      const response = await api.post('/forgot-password', { email });
      if (response.status === 200) {
        navigate('ForgotPasswordSuccess');
      } else {
        alert('Ocorreu um erro enquanto tentávamos enviar o email, tente novamente');
      }
    } catch (error) {
      alert('Ocorreu um erro enquanto tentávamos enviar o email, tente novamente');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
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
          keyboardType="email-address"
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#C1BCCC"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <RectButton
          style={[styles.okButton, { backgroundColor: isButtonActive ? '#04D361' : '#DCDCE5' }]}
          onPress={handleNavigateToForgotPasswordSuccess}
        >
          <Text
            style={[styles.okButtonText, { color: isButtonActive ? '#FFF' : '#9C98A6' }]}
          >
            Enviar
          </Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword;
