import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons'

import logoImg from '../../assets/images/logo.png';
import background from '../../assets/images/background.png';
import styles from './styles';
import api from '../../services/api';

function Login() {
  const { navigate } = useNavigation();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function init() {
      const tokenExists = await AsyncStorage.getItem('proffy_remember');
      if (tokenExists) {
        await AsyncStorage.setItem('proffy_token', tokenExists);
        navigate('Landing');
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (email && password) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email, password]);

  function handleNavigateToRegistration() {
    navigate('Registration');
  }

  function handleNavigateToForgotPassword() {
    navigate('ForgotPassword');
  }

  function handleChangePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  async function handleLogin() {
    if (!email || !password) {
      return;
    }

    const response = await api.post('/session', { email, password });
    const token = response.data;

    if (response.status === 200) {
      if (toggleCheckBox) {
        await AsyncStorage.setItem('proffy_remember', token.authorization);
      }
      await AsyncStorage.setItem('proffy_token', token.authorization);
      navigate('Landing');
    } else {
      console.log('ERRO')
      setPassword('');
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


        <View style={styles.textGroup}>
          <Text style={styles.title}>Fazer login</Text>
          <RectButton style={styles.linkButton} onPress={handleNavigateToRegistration}>
            <Text style={styles.linkPurple}>Criar uma conta</Text>
          </RectButton>
        </View>

        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#C1BCCC"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#C1BCCC"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <RectButton style={styles.passwordIcon} onPress={handleChangePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? 'ios-eye-off' : 'ios-eye'}
              size={25}
              color={'#9C98A6'}
            />
          </RectButton>
        </View>

        <View style={styles.textGroup}>
          <View style={styles.textGroup}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
            />
            <Text style={styles.link}>Lembrar-me</Text>
          </View>
          <RectButton style={styles.linkButton} onPress={handleNavigateToForgotPassword}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </RectButton>
        </View>

        <RectButton
          style={[styles.okButton, { backgroundColor: isButtonActive ? '#04D361' : '#DCDCE5' }]}
          onPress={handleLogin}
          underlayColor={'#333'}
        >
          <Text
            style={[styles.okButtonText, { color: isButtonActive ? '#FFF' : '#9C98A6' }]}
          >
            Entrar
            </Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
