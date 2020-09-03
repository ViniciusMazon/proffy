import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

interface TeacherSchedule {
  day: string;
  from: string;
  to: string;
}
export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  schedule: Array<TeacherSchedule>;
}
interface TeacherItemProps {
  teacher: Teacher;
}
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  function createNewConnection() {
    api.post('/connections', { user_id: teacher.id });
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>
        {teacher.bio}
      </p>
      <div className="teacher-schedule">
        {teacher.schedule.map(schedule => (
          <span>
            <p>Dia</p>
            <strong>{schedule.day}</strong>
            <p>Horário</p>
            <strong>{schedule.from}h - {schedule.to}h</strong>
          </span>
        ))}
      </div>
      <footer>
        <p>
          Preço/hora
        <strong>R$: {teacher.cost}</strong>
        </p>
        <a target="_blank" href={`https://wa.me${teacher.whatsapp}`} onClick={createNewConnection} >
          <img src={whatsappIcon} alt="Whatsapp" />
        Entrar em contato
      </a>
      </footer>
    </article >
  );
}

export default TeacherItem;
