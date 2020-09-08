import React, { useState } from 'react';
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
    { label: "Segunda", value: 0 },
    { label: "Terça", value: 1 },
    { label: "Quarta", value: 2 },
  ];

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

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
                items={subjectList}
                placeholder={{ label: "Selecione", value: null }}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>
                Horário
                </Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={text => setTime(text)}
                placeholder="Qual horário?"
                placeholderTextColor="#C1BCCC"
              />
            </View>
          </View>
          {/* <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton> */}
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
