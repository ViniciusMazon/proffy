import React, { FormEvent, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import PasswordInput from '../../components/PasswordInput';
import heartPurple from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login() {
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handlerSingUp(e: FormEvent) {

    e.preventDefault();
    console.log(email, password);
    const response = await api.post('/session', { email, password });
    const token = response.data;

    if (response.status === 200) {
      localStorage.setItem('proffy_token', token.authorization);
      history.push('/home');
    } else {
      console.log('ERRO')
      toast.error(token.message);
      setPassword('');
    }

  }

  return (
    <div id="page-login">
      <div id="logo-container" />

      <main className="form-container">
        <form onSubmit={handlerSingUp}>
          <h1>Fazer login</h1>
          <input
            className="custom-input"
            id="custom-input-top"
            type="email"
            placeholder="E -mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <PasswordInput passwordValue={password} setFunction={setPassword} />

          <div className="remember-and-forget">
            <span>
              <input type="checkbox" />
              <label>Lembrar-me</label>
            </span>
            <Link to="forgot-password">Esqueci minha senha</Link>
          </div>

          <button type="submit" disabled={isButtonDisabled}>Entrar</button>
        </form>
      </main>

      <footer>
        <p>
          Não tem conta? <br />
          <Link to="registration">Cadastre-se</Link>
        </p>
        <p>É de graça
            <img src={heartPurple} alt="Coração" />
        </p>
      </footer>
    </div >
  );
}

export default Login;
