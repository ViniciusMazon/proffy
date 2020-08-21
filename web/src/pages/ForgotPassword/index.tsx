import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (email) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);

  async function handleSubmitRegistration(e: FormEvent) {
    e.preventDefault();

    const response = await api.post('/forgot-password', { email });
    if (response.status === 200) {
      history.push('/forgot-password/success');
    } else {
      toast.error(response.data.message);
    }
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button disabled={isButtonDisabled}>Enviar</button>
        </form>
      </main>
    </div >
  );
}

export default ForgotPassword;
