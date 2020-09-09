import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import './styles.css';
import api from '../../services/api';

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState('Vinicius');
  const [surname, setSurname] = useState('Mazon');
  const [avatar, setAvatar] = useState('https://github.com/viniciusmazon.png');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

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

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    const token = sessionStorage.getItem('proffy_token');
    if (!token) {
      toast.error('Sua sessão expirou, você será redirecionado');
      setTimeout(() => {
        history.push('/');
      }, 3000);
      return
    }

    api.post('/classes', {
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
    <div id="page-teacher-form" className="container">
      <PageHeader
        name="Dar aulas"
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
        icon={rocketIcon}
        iconDescription="Prepare-se! Vai ser o máximo."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <span>
              <div className="teacher-profile">
                <img src={avatar} alt={name} />
                <strong>{name} {surname}</strong>
              </div>
              <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </span>
            <Textarea name="bio" label="Biografia (Máximo de 300 caracteres)" value={bio} onChange={e => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <span>
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
              <div key={scheduleItem.week_day} className="schedule-item">
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

export default TeacherForm;
