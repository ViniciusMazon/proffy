import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backIcon from '../../../assets/images/icons/back.png'
import styles from './styles';

function EmailAndPassword() {
  const { navigate, goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  function handleNavigateNext() {
    navigate('Success');
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
      />
      <TextInput
        style={[styles.input, { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}
        placeholder="Senha"
        placeholderTextColor="#C1BCCC"
      />

      <RectButton style={styles.okButton} onPress={handleNavigateNext}>
        <Text style={styles.okButtonText}>Concluir cadastro</Text>
      </RectButton>
    </View>
  );
}

export default EmailAndPassword;
