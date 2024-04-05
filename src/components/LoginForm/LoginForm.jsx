import React from 'react';
import './LoginForm.css'
import Button from '../../components/Button/Button';
import Loading from '../Loading/Loading';
import Input from './../Input/Input';

const LoginForm = ({ login, password, onChangeLogin, onChangePassword, onSubmit, loading }) => {
  return (
    <div className='formContainer1'>
      <div style={{ marginTop: '50px' }}>
        <Input
          placeholder='Login:'
          type='text'
          name='LoginInput'
          value={login}
          onChange={onChangeLogin}
        />
        <Input
          placeholder='Senha:'
          type='password'
          name='passwordInput'
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <p>
          <Button
            onClick={onSubmit}
            text={loading ? <Loading /> : 'Entrar'}
            disabled={loading}
          />
        </p>
      </div>
      <div style={{ marginTop: '80px' }}>
        <a href="/register" className="forgotPassword">
          Cadastrar-se
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
