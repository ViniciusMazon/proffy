import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import backIcon from '../../../assets/images/icons/back.png'
import styles from './styles';

function WhoAreYou() {
  const { navigate, goBack } = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  function handleNavigateBack() {
    goBack();
  }

  function handleNavigateNext() {
    navigate('EmailAndPassword', { name, surname });
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

      <Text style={styles.subTitle}>01.   Quem é você?</Text>
      <TextInput
        style={[styles.input, { borderTopRightRadius: 8, borderTopLeftRadius: 8 }]}
        placeholder="Nome"
        placeholderTextColor="#C1BCCC"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={[styles.input, { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}
        placeholder="Sobrenome"
        placeholderTextColor="#C1BCCC"
        value={surname}
        onChangeText={text => setSurname(text)}
      />

      <RectButton style={styles.okButton} onPress={handleNavigateNext}>
        <Text style={styles.okButtonText}>Próxima</Text>
      </RectButton>
    </View>
  );
}

export default WhoAreYou;
