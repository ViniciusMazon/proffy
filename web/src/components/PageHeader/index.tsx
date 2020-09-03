import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';

interface PageHeaderProps {
  name?: string;
  title: string;
  description?: string;
  icon?: string;
  iconDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header" >
      <div className="top-bar-container">
        <Link to="/home">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <p>{props.name}</p>
        <img src={logoImg} alt="Logo Proffy" />
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        <div>
          {props.description && <p>{props.description}</p>}
          <span>
            <img src={props.icon} alt={props.description} />
            <p>{props.iconDescription}</p>
          </span>
        </div>
        {props.children}
      </div>
    </header >
  );
}

export default PageHeader;
