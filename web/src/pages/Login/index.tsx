import React from 'react';

import heartPurple from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login() {
  return (
    <div id="page-login">
      <div id="logo-container" />

      <main className="form-container">
        <form>
          <h1>Fazer login</h1>
          <input className="custom-input" id="custom-input-top" type="email" placeholder="E -mail" />
          <input className="custom-input" id="custom-input-bottom" type="password" placeholder="Senha" />

          <div className="remember-and-forget">
            <span>
              <input type="checkbox" />
              <label>Lembrar-me</label>
            </span>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button>Entrar</button>
        </form>
      </main>

      <footer>
        <p>
          Não tem conta? <br />
          <a href="#">Cadastre-se</a>
        </p>
        <p>É de graça
            <img src={heartPurple} alt="Coração" />
        </p>
      </footer>
    </div>
  );
}

export default Login;
