import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backIcon from '../../../assets/images/icons/back.png'
import styles from './styles';
import api from '../../../services/api';

function EmailAndPassword() {
  const route = useRoute();
  const routeParams: any = route.params;
  const { navigate, goBack } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateBack() {
    goBack();
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
      navigate('Success');
    } else {
      console.log('ERRO');
    }
  }

  return (
    <View style={styles.container}>
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
      <TextInput
        style={[styles.input, { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}
        placeholder="Senha"
        placeholderTextColor="#C1BCCC"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <RectButton style={styles.okButton} onPress={handleNavigateNext}>
        <Text style={styles.okButtonText}>Concluir cadastro</Text>
      </RectButton>
    </View>
  );
}

export default EmailAndPassword;
