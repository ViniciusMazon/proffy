import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import logoffIcon from '../../assets/images/icons/logoff.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

function Landing() {
  const history = useHistory();
  const [user, setUser] = useState<IUser>();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function getTotalConnections() {
      const token = sessionStorage.getItem('proffy_token');
      const response = await api.get('/connections', { headers: { authorization: token } });
      if (response.status === 200) {
        setTotalConnections(response.data.total);
      }
    }

    function getStoragedUserData() {
      const data = localStorage.getItem('proffy_user');
      const userData = JSON.parse(String(data));
      setUser(userData);
    }

    getStoragedUserData();
    getTotalConnections();
  }, []);

  function handleLogOff() {
    localStorage.removeItem('proffy_remember');
    sessionStorage.removeItem('proffy_token');
    history.push('/');
  }

  return (
    <div id="page-landing">
      <div id="page-landing-content">
        <div className="page-landing-header">
          <Link className="profile" to="/profile">
            <img src={user?.avatar} alt="Imagem de perfil do usuário" />
            <p>{user?.name} {user?.surname}</p>
          </Link>
          <div className="logoff-button" onClick={handleLogOff}>
            <img src={logoffIcon} alt="Fazer logoff" />
          </div>
        </div>

        <div className="logo-container">
          <img src={logoImg} alt="Proffy logo" />
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

        <div className="page-landing-footer">
          <div id="page-lading-footer-content">
            <h1>Seja bem-vindo. <br /><strong>O que deseja fazer?</strong></h1>
            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>
              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
            </div>
            <span className="total-connections">
              Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
