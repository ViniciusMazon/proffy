import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import smileIcon from '../../assets/images/icons/smile.png';
import styles from './styles';
import pickerSelectStyles from '../../assets/styles/pickerSelectStyles';

function TeacherList() {
  const subjectList = [
    { label: "Inglês", value: "Inglês" },
    { label: "Matemática", value: "Matemática" },
    { label: "História", value: "História" },
  ];

  const weekdayList = [
    { label: "Domingo", value: 0 },
    { label: "Segunda", value: 1 },
    { label: "Terça", value: 2 },
    { label: "Quarta", value: 3 },
    { label: "Quinta", value: 4 },
    { label: "Sexta", value: 5 },
    { label: "Sábado", value: 6 },
  ];

  const timeList = [
    { label: "00:00", value: '00:00' },
    { label: "01:00", value: '01:00' },
    { label: "02:00", value: '02:00' },
    { label: "03:00", value: '03:00' },
    { label: "04:00", value: '04:00' },
    { label: "05:00", value: '05:00' },
    { label: "06:00", value: '06:00' },
    { label: "07:00", value: '07:00' },
    { label: "08:00", value: '08:00' },
    { label: "09:00", value: '09:00' },
    { label: "10:00", value: '10:00' },
    { label: "11:00", value: '11:00' },
    { label: "12:00", value: '12:00' },
    { label: "13:00", value: '13:00' },
    { label: "14:00", value: '14:00' },
    { label: "15:00", value: '15:00' },
    { label: "16:00", value: '16:00' },
    { label: "17:00", value: '17:00' },
    { label: "18:00", value: '18:00' },
    { label: "19:00", value: '19:00' },
    { label: "20:00", value: '20:00' },
    { label: "21:00", value: '21:00' },
    { label: "22:00", value: '22:00' },
    { label: "23:00", value: '23:00' },
  ];

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (week_day !== '' && subject !== '' && time !== '') {
      handleFiltersSubmit();
      setWeek_day('');
      setSubject('');
      setTime('');
    }
  }, [week_day, subject, time]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    loadFavorites();
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const token = await AsyncStorage.getItem('proffy_token');
    const response = await api.get('/classes', {
      params: {
        week_day,
        subject,
        time
      },
      headers: { authorization: token }
    });
    setTeachers(response.data);
    setIsFiltersVisible(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        name="Estudar"
        title="Proffys disponíveis"
        icon={smileIcon}
        iconText="32 proffys"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible} style={styles.headerRightContainer}>
            <Feather name="filter" size={20} color="#04D361" />
            <Text style={styles.headerRightText}>Filtrar por dia, hora e matéria</Text>
            <Feather name={isFiltersVisible ? "chevron-up" : "chevron-down"} size={20} color="#A380F6" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (<View style={styles.searchForm}>
          <Text style={styles.label}>
            Matéria
            </Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setSubject(value)}
            items={subjectList}
            placeholder={{ label: "Selecione", value: null }}
          />

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>
                Dia da semana
                </Text>

              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => setWeek_day(value)}
                items={weekdayList}
                placeholder={{ label: "Selecione", value: null }}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>
                Horário
                </Text>

              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => setTime(value)}
                items={timeList}
                placeholder={{ label: "Selecione", value: null }}
              />
            </View>
          </View>
        </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
