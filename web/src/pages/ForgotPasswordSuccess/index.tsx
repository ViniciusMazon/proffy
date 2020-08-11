import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function ForgotPasswordSuccess() {
  return (
    <div id="page-forgot-password-success">
      <img src={successIcon} alt="Cadastro concluído" />
      <h1>Redefinição enviada!</h1>
      <p>
        Boa, agora é só checar o e-mail que foi enviado para
        você redefinir sua senha e aproveitar os estudos.
        Tenha uma ótima experiência.
    </p>
      <Link to="/">Voltar ao login</Link>
    </div>
  );
}

export default ForgotPasswordSuccess;

