import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import smileIcon from '../../assets/images/icons/smile.svg';
import './styles.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    const token = sessionStorage.getItem('proffy_token');
    const { data } = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
      headers: {
        authorization: token,
      }
    });


    setTotalTeachers(data.length);
    setTeachers(data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        name="Estudar"
        title="Estes são os proffys disponíveis "
        description="O primeiro passo, é preencher esse formulário de inscrição."
        icon={smileIcon}
        iconDescription={`Nós temos ${totalTeachers} professores.`}
      >
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'História', label: 'História' },
              { value: 'Química', label: 'Química' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Português', label: 'Português' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Geográfia', label: 'Geográfia' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div >
  );
}

export default TeacherList;
