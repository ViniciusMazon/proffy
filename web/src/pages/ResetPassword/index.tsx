import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import './styles.css';

interface matchProps {
  match: {
    params: {
      email: string,
      token: string,
    }
  }
}

function ResetPassword(props: matchProps) {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  async function handleResetPassword(e: FormEvent) {

    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('As senhas precisam ser iguais');
      return;
    }

    try {
      const data = {
        email: props.match.params.email,
        token: props.match.params.token,
        password
      }
      const response = await api.post('/reset-password', data);
      if (response.status === 200) {
        history.push('/reset-password/success');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Ocorreu um erro na solicitação');
    }
  }

  return (
    <div id="page-reset-password">
      <div id="logo-container" />
      <main className="form-container">
        <form onSubmit={handleResetPassword}>
          <h1>Seja criativo!</h1>
          <p>Escolha uma senha forte.</p>
          <input
            className="custom-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className="custom-input"
            type="password"
            placeholder="Confirme sua senha"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
          />
          <button disabled={isButtonDisabled} type="submit">Salvar</button>
        </form>
      </main>
    </div >
  );
}

export default ResetPassword;
