import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleSubmitRegistration(e: FormEvent) {
    e.preventDefault();
    history.push('/registration/welcome');
  }

  return (
    <div id="page-forgot-password">
      <div id="logo-container" />
      <main className="form-container">
        <form onSubmit={handleSubmitRegistration}>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <h1>Eita, esqueceu sua senha?</h1>
          <p>Não esquenta, vamos dar um jeito nisso.</p>
          <input
            className="custom-input"
            type="email"
            placeholder="E-mail"
          />
          <button disabled={isButtonDisabled}>Enviar</button>
        </form>
      </main>
    </div >
  );
}

export default ForgotPassword;
