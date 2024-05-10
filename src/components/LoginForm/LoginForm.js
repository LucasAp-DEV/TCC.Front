import React, { useState } from 'react';
import './LoginForm.css'
import Loading from '../Loading/Loading';

const LoginForm = ({ login, password, onChangeLogin, onChangePassword, onSubmit, loading }) => {
  
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className='formContainer1' onSubmit={onSubmit}>
      <div style={{ marginTop: '50px' }}>
        <input
          placeholder='Login:'
          type='text'
          name='LoginInput'
          value={login}
          onChange={onChangeLogin}
          required
        />
      </div>
      <div className="passwordContainer">
        <input
          placeholder='Senha:'
          type={showPassword ? 'text' : 'password'}
          name='passwordInput'
          value={password}
          onChange={onChangePassword}
          required
        />
        <button type="button" className="passwordVisibilityButton" onClick={PasswordVisibility}>
          {showPassword ? '--' : '👁️'}
        </button>
      </div>
      <div>
        <p>
          <button type='submit' disabled={loading}>
            {loading ? <Loading /> : 'Entrar'}
          </button>
        </p>
      </div>
      <div style={{ marginTop: '80px' }}>
        <a href="/register" className="forgotPassword">
          Cadastrar-se
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
