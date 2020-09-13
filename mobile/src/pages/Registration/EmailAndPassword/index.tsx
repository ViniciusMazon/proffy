import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'

import SuccessPage from '../../../components/SuccessPage';
import backIcon from '../../../assets/images/icons/back.png'
import styles from './styles';
import api from '../../../services/api';

function EmailAndPassword() {
  const route = useRoute();
  const routeParams: any = route.params;
  const { navigate, goBack } = useNavigation();

  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (email && password) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email, password]);

  function handleNavigateBack() {
    goBack();
  }

  function handleChangePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }


  async function handleNavigateNext() {
    const data = {
      name: routeParams.name,
      surname: routeParams.surname,
      email,
      password
    }

    const response = await api.post('/registration', data);
    if (response.status === 201) {
      setIsRegistrationCompleted(true);
    } else {
      console.log('ERRO');
    }
  }

  if (isRegistrationCompleted) {
    return (
      <SuccessPage
        title="Cadastro concluído!"
        message="Agora você faz parte da plataforma da Proffy"
        redirectTo="Login"
        buttonText="Fazer login"
      />
    );
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.header}>
          <RectButton onPress={handleNavigateBack} style={styles.linkButton}>
            <Image source={backIcon} />
          </RectButton>
          <View style={styles.dotContainer}>
            <View style={[styles.dot, { backgroundColor: '#8257E5' }]} />
            <View style={[styles.dot, { backgroundColor: '#C1BCCC' }]} />
          </View>
        </View>

        <View>
          <Text style={styles.title}>Crie sua conta gratuíta</Text>
          <Text style={styles.description}>Basta preencher esses dados e você estará conosco.</Text>
        </View>

        <Text style={styles.subTitle}>02.  Email e Senha</Text>
        <TextInput
          style={[styles.input, { borderTopRightRadius: 8, borderTopLeftRadius: 8 }]}
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

        <RectButton
          style={[styles.okButton, { backgroundColor: isButtonActive ? '#04D361' : '#DCDCE5' }]}
          onPress={handleNavigateNext}
        >
          <Text
            style={[styles.okButtonText, { color: isButtonActive ? '#FFF' : '#9C98A6' }]}
          >
            Concluir cadastro
             </Text>
        </RectButton>
      </KeyboardAvoidingView>
    );
  }
}



export default EmailAndPassword;
