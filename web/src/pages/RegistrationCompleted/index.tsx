import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function RegistrationCompleted() {
  return (
    <div id="page-registration-completed">
      <img src={successIcon} alt="Cadastro concluído" />
      <h1>Cadastro concluído</h1>
      <p>Agora você faz parte da plataforma da Proffy.
    Tenha uma ótima experiência.</p>
      <Link to="/">Fazer login</Link>
    </div>
  );
}

export default RegistrationCompleted;

