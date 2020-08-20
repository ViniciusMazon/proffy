import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function ResetPasswordSuccess() {
  return (
    <div id="page-reset-password-success">
      <img src={successIcon} alt="Cadastro concluído" />
      <h1>Redefinição concluída!</h1>
      <p>Prontinho, sua senha foi redefinida.</p>
    </div>
  );
}

export default ResetPasswordSuccess;

