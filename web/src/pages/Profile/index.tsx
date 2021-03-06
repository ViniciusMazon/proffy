import React, { FormEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import ProfileHeader from '../../components/ProfileHeader';
import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function Profile() {
  const history = useHistory();
  const token = sessionStorage.getItem('proffy_token');
  const [userId, setUserId] = useState(0);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [classId, setClassId] = useState(0);
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);


  useEffect(() => {
    const data = localStorage.getItem('proffy_user');
    const user = JSON.parse(String(data));
    setUserId(user.id);
    setAvatar(user.avatar);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setWhatsapp(user.whatsapp);
    setBio(user.bio);
  }, []);

  useEffect(() => {
    async function getClassData() {
      const { data } = await api(`/classes/${userId}`, { headers: { authorization: token } });
      setClassId(data.id);
      setSubject(data.subject);
      setCost(data.cost);
      setScheduleItems(data.schedule);
    }

    getClassData();
  }, [token, userId]);

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

  async function handleDeleteSchedule(weekDay: number) {
    await api.delete(`classes/${classId}/${weekDay}`, { headers: { authorization: token } });
    const newScheduleItems = scheduleItems.filter(scheduleItem => {
      if (scheduleItem.week_day !== weekDay) {
        return scheduleItem;
      }
    });
    setScheduleItems(newScheduleItems);
  }

  function handleSaveChanges(e: FormEvent) {
    e.preventDefault();
    if (!token) {
      toast.error('Sua sessão expirou, você será redirecionado');
      setTimeout(() => {
        history.push('/');
      }, 3000);
      return
    }

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
    }).then(() => {
      sessionStorage.setItem('proffy_user', JSON.stringify({
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
      toast.error('Cadastro realizado com sucesso, você será redirecionado');
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }).catch((err) => {
      toast.error('Ops... algum erro ocorreu durante o cadastro, tente novamente');
      console.log(err);
    });
  }

  return (
    <div id="page-profile" className="container">
      <ProfileHeader
        name={`${name} ${surname}`}
        subject="Inglês"
        avatar={avatar}
      />

      <main>
        <form onSubmit={handleSaveChanges}>
          <fieldset>
            <legend>Seus dados</legend>
            <span className="input-group">
              <Input name="name" label="Nome" value={name} onChange={e => setName(e.target.value)} />
              <Input name="surname" label="Sobrenome" value={surname} onChange={e => setSurname(e.target.value)} />
            </span>
            <span className="input-group">
              <Input name="email" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
              <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </span>
            <Textarea name="bio" label="Biografia" value={bio} onChange={e => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <span className="input-group">
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
              <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
            </span>
          </fieldset>

          <fieldset>
            <legend>Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day}>
                <div className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
                <div className="schedule-item-delete">
                  <span />
                  <button type="button" onClick={() => handleDeleteSchedule(scheduleItem.week_day)}>Excluir horário</button>
                  <span />
                </div>
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;
