import React, { FormEvent, useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import PasswordInput from '../../components/PasswordInput';
import heartPurple from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login() {
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);

  useEffect(() => {
    const validToken = localStorage.getItem('proffy_remember');
    if (validToken) {
      sessionStorage.setItem('proffy_token', validToken);
      history.push('/home');
    }
  }, [history]);

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  async function handlerSingUp(e: FormEvent) {
    e.preventDefault();
    console.log(email, password);
    const response = await api.post('/session', { email, password });
    const token = response.data;

    if (response.status === 200) {
      const user = await api.get(`/user/${email}`, { headers: { authorization: token.authorization } });
      if (response.status === 200) {
        localStorage.setItem('proffy_user', JSON.stringify(user.data));
      } else {
        toast.error('Ocorreu um erro, tente novamente mais tarde!');
        return;
      }

      if (isRememberMe) {
        localStorage.setItem('proffy_remember', token.authorization)
      }
      sessionStorage.setItem('proffy_token', token.authorization);
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
              <input id="rememberme" type="checkbox" defaultChecked={isRememberMe} onChange={() => setIsRememberMe(!isRememberMe)} />
              <label id="rememberme">Lembrar-me</label>
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
