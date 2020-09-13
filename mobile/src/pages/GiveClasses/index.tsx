import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton, TextInput, BorderlessButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import alertIcon from '../../assets/images/icons/alert.png';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import pickerSelectStyles from '../../assets/styles/pickerSelectStyles';
import SuccessPage from '../../components/SuccessPage';

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

function GiveClasses() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IParams;
  const token = routeParams.token;

  const [isCompleted, setIsCompleted] = useState(false);
  const [userId, setUserId] = useState(routeParams.user.id);
  const [name, setName] = useState(routeParams.user.name);
  const [avatar, setAvatar] = useState(routeParams.user.avatar);
  const [surname, setSurname] = useState(routeParams.user.surname);
  const [whatsapp, setWhatsapp] = useState(routeParams.user.whatsapp);
  const [bio, setBio] = useState(routeParams.user.bio);
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  const subjectsList = [
    { label: 'Português', value: 'Português' },
    { label: 'Matemárica', value: 'Matemárica' }
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

  useEffect(() => {
    async function getClassData() {
      const { data } = await api(`/classes/${userId}`, { headers: { authorization: token } });
      setSubject(data.subject);
      setCost(String(data.cost));
      setScheduleItems(data.schedule);
    }

    getClassData();
  }, []);

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

  function handleSaveRegister() {
    api.post('/classes', {
      id: userId,
      name,
      surname,
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
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      }));
      setIsCompleted(true);
    });
  }

  if (isCompleted) {
    return (
      <SuccessPage
        title="Cadastro Salvo!"
        message="Tudo certo, seu cadastro está
        na nossa lista de professores. Agora é
        só ficar de olho no seu WhatsApp."
        redirectTo="Landing"
        buttonText="Concluir cadastro"
      />
    );
  } else {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.topBar}>
          <BorderlessButton onPress={handleNavigateBack}>
            <Image source={backIcon} resizeMode="contain" />
          </BorderlessButton>
          <Text style={styles.topBarName}>Dar aulas</Text>
          <Image source={logoImg} resizeMode="contain" />
        </View>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>Que incrível que você quer dar aulas.</Text>
          </View>
          <Text style={styles.subTitle}>O primeiro passo, é preencher esse formulário de inscrição.</Text>

        </View>

        <View style={styles.card}>
          <View style={styles.fieldset}>
            <Text style={styles.title}>Seus dados</Text>


            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{name} {surname}</Text>
                <Text style={styles.subject}>{subject}</Text>
              </View>
            </View>

            <Text style={styles.label}>
              WhatsApp
              </Text>
            <TextInput
              style={styles.input}
              value={whatsapp}
              onChangeText={text => setWhatsapp(text)}
              placeholder={whatsapp}
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
              <View key={index} nativeID={String(index)}>
                <Text style={styles.label}> Dia da semana</Text>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={(value) => setScheduleItemValue(index, 'week_day', value)}
                  items={weekDaysList}
                  placeholder={{ label: 'Selecione a dia da semana', value: scheduleItem.week_day }}
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
                  <RectButton style={styles.deleteLineButton}>
                    <Text style={styles.deleteLineButtonText}>Excluir horário</Text>
                  </RectButton>
                </View>
              </View>
            ))}

          </View>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.footerButton} onPress={handleSaveRegister}>
            <Text style={styles.footerButtonText}>Salvar cadastro</Text>
          </RectButton>
          <View style={styles.footerAlert}>
            <Image source={alertIcon} />
            <View style={styles.footerAlertTextContainer}>
              <Text style={styles.footerAlertTitle}>Importante!</Text>
              <Text style={styles.footerAlertMessage}>Preencha todos os dados</Text>
            </View>
          </View>
        </View>
      </ScrollView >
    );
  }
}

export default GiveClasses;
