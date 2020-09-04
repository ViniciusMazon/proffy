import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, TextInputComponent, ScrollView } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import pickerSelectStyles from '../../assets/styles/pickerSelectStyles';

function Profile() {
  const { goBack } = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [weekday, setWeekDay] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const subjectsList = [
    { label: 'Português', value: 'Português' },
    { label: 'Matemárica', value: 'Matemárica' }
  ]

  const weekDaysList = [
    { label: 'Domingo', value: 0 },
    { label: 'Segunda', value: 1 },
    { label: 'Terça', value: 2 },
    { label: 'Quarta', value: 3 },
    { label: 'Quinta', value: 4 },
    { label: 'Sexta', value: 5 },
    { label: 'Sábado', value: 6 },
  ]

  function handleNavigateBack() {
    goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.header}
      >
        <Image
          source={{ uri: 'https://github.com/viniciusmazon.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Vinicius Mazon</Text>
        <Text style={styles.subject}>Inglês</Text>
      </ImageBackground>

      <View style={styles.card}>
        <View style={styles.fieldset}>
          <Text style={styles.title}>Seus dados</Text>
          <Text style={styles.label}>
            Nome
            </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Nome"
            placeholderTextColor="#C1BCCC"
          />

          <Text style={styles.label}>
            Sobrenome
            </Text>
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={text => setSurname(text)}
            placeholder="Sobrenome"
            placeholderTextColor="#C1BCCC"
          />
          <Text style={styles.label}>
            E-mail
            </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="E-mail"
            placeholderTextColor="#C1BCCC"
          />

          <Text style={styles.label}>
            WhatsApp
            </Text>
          <TextInput
            style={styles.input}
            value={whatsapp}
            onChangeText={text => setWhatsapp(text)}
            placeholder="WhatsApp"
            placeholderTextColor="#C1BCCC"
          />

          <Text style={styles.label}>
            Biografia
            </Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={30}
            value={bio}
            onChangeText={text => setBio(text)}
          />
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.title}>Sobre a aula</Text>
          <Text style={styles.label}>
            Matéria
            </Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setSubject(value)}
            items={subjectsList}
            placeholder={{ label: 'Selecione a matéria', value: null }}
          />

          <Text style={styles.label}>
            Custo da sua hora por aula
            </Text>
          <TextInput
            style={styles.input}
            value={cost}
            onChangeText={text => setCost(text)}
            placeholder="Custo"
            placeholderTextColor="#C1BCCC"
          />
        </View>

        <View style={styles.fieldset}>
          <View style={styles.titleAndButton}>
            <Text style={styles.title}>Horários disponíveis</Text>
            <RectButton style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Novo</Text>
            </RectButton>
          </View>
          <Text style={styles.label}> Dia da semana</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setWeekDay(value)}
            items={weekDaysList}
            placeholder={{ label: 'Selecione a dia da semana', value: null }}
          />
          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>
                Das
            </Text>
              <TextInput
                style={styles.input}
                value={from}
                onChangeText={text => setFrom(text)}
                placeholder="Das"
                placeholderTextColor="#C1BCCC"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>
                Até
            </Text>
              <TextInput
                style={styles.input}
                value={to}
                onChangeText={text => setTo(text)}
                placeholder="Até"
                placeholderTextColor="#C1BCCC"
              />
            </View>
          </View>
          <View style={styles.footerSeparator}>
            <View style={styles.line} />
            <RectButton style={styles.deleteLineButton}>
              <Text style={styles.deleteLineButtonText}> Excluir horário</Text>
            </RectButton>
          </View>
        </View>
      </View>
    </ScrollView >
  );
}

export default Profile;
