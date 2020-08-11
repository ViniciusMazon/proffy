import React, { useState } from 'react';

import PasswordInput from '../../components/PasswordInput';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';
import { Link } from 'react-router-dom';

function Registration() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  return (
    <div id="page-registration">
      <div id="logo-container" />
      <main className="form-container">
        <form>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
            <h1>Cadastro</h1>
            <p>Preencha os dados abaixo para começar.</p>
          <input
            className="custom-input"
            id="custom-input-top"
            type="text"
            placeholder="Nome"
          />
          <input
            className="custom-input"
            type="text"
            placeholder="Sobrenome"
          />
          <input
            className="custom-input"
            type="email"
            placeholder="E-mail"
          />
          <PasswordInput />
          <button disabled={isButtonDisabled}>Concluir cadastro</button>
        </form>
      </main>
    </div >
  );
}

export default Registration;
