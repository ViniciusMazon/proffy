import React, { useState } from 'react';
import { Image, ImageBackground, Text, TextInput, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';
import background from '../../assets/images/background.png';
import styles from './styles';

function Login() {
  const { navigate } = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  function handleNavigateToRegistration() {
    navigate('Registration');
  }

  function handleNavigateToLanding() {
    navigate('Landing');
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


        <View style={styles.textGroup}>
          <Text style={styles.title}>Fazer login</Text>
          <RectButton style={styles.linkButton} onPress={handleNavigateToRegistration}>
            <Text style={styles.linkPurple}>Criar uma conta</Text>
          </RectButton>
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#C1BCCC"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#C1BCCC"
        />

        <View style={styles.textGroup}>
          <View style={styles.textGroup}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
            />
            <Text style={styles.link}>Lembrar-me</Text>
          </View>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </View>

        <RectButton style={styles.okButton} onPress={handleNavigateToLanding}>
          <Text style={styles.okButtonText}>Entrar</Text>
        </RectButton>
      </View>
    </View>
  );
}

export default Login;
