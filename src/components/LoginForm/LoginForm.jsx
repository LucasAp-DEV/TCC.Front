import React from 'react';
import './LoginForm.css'
import Input from '../../components/Button/Input';
import Button from '../../components/Button/Button';
import Loading from '../Loading/Loading';

const LoginForm = ({ login, password, onChangeLogin, onChangePassword, onSubmit, loading }) => {
  return (
    <div className='formContainer1'>
      <div>
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
      <p>
      <Button
            onClick={onSubmit} 
            text={loading ? <Loading /> : 'Entrar'}
            disabled={loading}
          />
      </p>
      <div style={{ marginTop:'8px'}}>
          <a href="/register" className="forgotPassword">
            Cadastrar-se
          </a>
      </div>
      
      </div>
    </div>
  );
}

export default LoginForm;
