import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import cameraIcon from '../../assets/images/icons/camera.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';

interface ProfileHeaderProps {
  name: string;
  subject: string;
  avatar: string;
}

const PageHeader: React.FC<ProfileHeaderProps> = (props) => {
  return (
    <header className="profile-header" >
      <div className="top-bar-container">
        <Link to="/home">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <p>Meu Perfil</p>
        <img src={logoImg} alt="Logo Proffy" />
      </div>

      <div className="profile-header-content">
        <span>
          <img src={props.avatar} alt={props.name} />
          <button type="button">
            <img src={cameraIcon} alt="Atualizar foto de perfil" />
          </button>
        </span>
        <strong>{props.name}</strong>
        <p>{props.subject}</p>
      </div>
    </header >
  );
}

export default PageHeader;
