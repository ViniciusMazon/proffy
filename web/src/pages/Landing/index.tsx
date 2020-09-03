import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import logoffIcon from '../../assets/images/icons/logoff.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function init() {
      const token = sessionStorage.getItem('proffy_token');
      const response = await api.get('/connections', { headers: { authorization: token } });
      if (response.status === 200) {
        setTotalConnections(response.data.total);
      }
    }

    init();
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content">
        <div className="page-landing-header">
          <Link className="profile" to="/profile">
            <img src="https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4" alt="Profile image" />
            <p>Vinicius Mazon</p>
          </Link>
          <div className="logoff-button">
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
