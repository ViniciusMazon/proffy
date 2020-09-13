import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { RectButton, TextInput, BorderlessButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import pickerSelectStyles from '../../assets/styles/pickerSelectStyles';

interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}
interface IParams {
  user: IUser;
  token: string;
}

function Profile() {
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IParams;
  const token = routeParams.token;

  const [userId, setUserId] = useState(routeParams.user.id);
  const [name, setName] = useState(routeParams.user.name);
  const [surname, setSurname] = useState(routeParams.user.surname);
  const [email, setEmail] = useState(routeParams.user.email);
  const [whatsapp, setWhatsapp] = useState(routeParams.user.whatsapp);
  const [bio, setBio] = useState(routeParams.user.bio);
  const [avatar, setAvatar] = useState(routeParams.user.avatar);

  const [classId, setClassId] = useState(0);
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  useEffect(() => {
    async function getClassData() {
      const { data } = await api(`/classes/${userId}`, { headers: { authorization: token } });
      setClassId(data.id);
      setSubject(data.subject);
      setCost(String(data.cost));
      setScheduleItems(data.schedule);
    }

    getClassData();
  }, []);

  async function handleDeleteSchedule(weekDay: number) {
    await api.delete(`classes/${classId}/${weekDay}`, { headers: { authorization: token } });
    const newScheduleItems = scheduleItems.filter(scheduleItem => {
      if (scheduleItem.week_day !== weekDay) {
        return scheduleItem;
      }
    });
    setScheduleItems(newScheduleItems);
  }

  const subjectsList = [
    { label: 'Português', value: 'Português' },
    { label: 'Matemática', value: 'Matemática' }
  ];

  const weekDaysList = [
    { label: 'Domingo', value: 0 },
    { label: 'Segunda', value: 1 },
    { label: 'Terça', value: 2 },
    { label: 'Quarta', value: 3 },
    { label: 'Quinta', value: 4 },
    { label: 'Sexta', value: 5 },
    { label: 'Sábado', value: 6 },
  ];



  function handleNavigateBack() {
    goBack();
  }

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleSaveChanges() {
    api.post('/classes', {
      id: userId,
      name,
      surname,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }, {
      headers: { authorization: token }
    }).then(async () => {
      await AsyncStorage.setItem('proffy_user', JSON.stringify({
        id: userId,
        name,
        surname,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      }));
      navigate('Landing');
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleNavigateBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Text style={styles.topBarName}>Meu perfil</Text>
        <Image source={logoImg} resizeMode="contain" />
      </View>

      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.header}
      >
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name} {surname}</Text>
        <Text style={styles.subject}>{subject}</Text>
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
            keyboardType="email-address"
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
            keyboardType="phone-pad"
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
            placeholder={{ label: subject, value: subject }}
          />

          <Text style={styles.label}>
            Custo da sua hora por aula
            </Text>
          <TextInput
            style={styles.input}
            value={cost}
            onChangeText={text => setCost(text)}
            placeholder={String(cost)}
            placeholderTextColor="#C1BCCC"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.fieldset}>
          <View style={styles.titleAndButton}>
            <Text style={styles.title}>Horários disponíveis</Text>
            <RectButton style={styles.addButton} onPress={addNewScheduleItem}>
              <Text style={styles.addButtonText}>+ Novo</Text>
            </RectButton>
          </View>

          {scheduleItems.map((scheduleItem, index) => (
            <View key={index}>
              <Text style={styles.label}> Dia da semana</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => setScheduleItemValue(index, 'week_day', value)}
                items={weekDaysList}
                placeholder={{ label: 'Dia da semana', value: scheduleItem.week_day }}
              />
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Das</Text>
                  <TextInput
                    style={styles.input}
                    value={scheduleItem.from}
                    onChangeText={text => setScheduleItemValue(index, 'from', text)}
                    placeholder="Das"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Até</Text>
                  <TextInput
                    style={styles.input}
                    value={scheduleItem.to}
                    onChangeText={text => setScheduleItemValue(index, 'to', text)}
                    placeholder="Até"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>
              </View>
              <View style={styles.footerSeparator}>
                <View style={styles.line} />
                <RectButton style={styles.deleteLineButton} onPress={() => handleDeleteSchedule(scheduleItem.week_day)}>
                  <Text style={styles.deleteLineButtonText}>Excluir horário</Text>
                </RectButton>
              </View>
            </View>
          ))}

        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.footerButton} onPress={handleSaveChanges}>
          <Text style={styles.footerButtonText}>Salvar alterações</Text>
        </RectButton>
      </View>
    </ScrollView >
  );
}

export default Profile;
