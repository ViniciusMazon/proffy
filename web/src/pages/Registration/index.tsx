import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

import PasswordInput from '../../components/PasswordInput';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';


function Registration() {
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (name && surname && email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, surname, email, password]);

  async function handleSubmitRegistration(e: FormEvent) {
    e.preventDefault();
    const response = await api.post('/registration', { name, surname, email, password });
    if (response.status === 201) {
      history.push('/registration/welcome');
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div id="page-registration">
      <div id="logo-container" />
      <main className="form-container">
        <form onSubmit={handleSubmitRegistration}>
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
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="custom-input"
            type="text"
            placeholder="Sobrenome"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
          />
          <input
            className="custom-input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <PasswordInput passwordValue={password} setFunction={setPassword} />
          <button type="submit" disabled={isButtonDisabled}>Concluir cadastro</button>
        </form>
      </main>
    </div >
  );
}

export default Registration;
