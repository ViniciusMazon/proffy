import React, { useState } from 'react';

import eyeIcon from '../../assets/images/icons/eye.svg';
import eyeOffIcon from '../../assets/images/icons/eye-off.svg';

import './styles.css';

interface PasswordInputProps {
  passwordValue: string,
  setFunction: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput: React.FC<PasswordInputProps> = ({ passwordValue, setFunction }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="password-input-block custom-input" id="custom-input-bottom">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Senha"
        value={passwordValue}
        onChange={e => setFunction(e.target.value)}
        required
      />
      <img src={isPasswordVisible ? eyeOffIcon : eyeIcon} alt="eye" onClick={togglePasswordVisibility} />
    </div>
  );
}

export default PasswordInput;
