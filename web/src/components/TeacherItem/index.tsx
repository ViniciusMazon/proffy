import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4"
          alt="Vinicius Mazon"
        />
        <div>
          <strong>Vinicius Mazon</strong>
          <span>Química</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias de química avançada.
      <br /><br />
      Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
    </p>
      <footer>
        <p>
          Preço/hora
        <strong>R$: 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
        Entrar em contato
      </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
