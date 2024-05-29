import React from 'react';
import './LoginForm.css'
import Loading from '../Loading/Loading';
import Input from '../Input/Input';

const LoginForm = ({ login, password, onChangeLogin, onChangePassword, onSubmit, loading }) => {
  return (
    <form className='formContainer1' onSubmit={onSubmit}>
      <div style={{ marginTop: '50px' }}>
        <input
          placeholder='Login:'
          type='text'
          value={login}
          onChange={onChangeLogin}
          title='Login'
          required
        />
        <input
          placeholder='Senha:'
          type='password'
          value={password}
          onChange={onChangePassword}
          title='Senha'
          required
        />
      </div>
      <div>
        <p>
          <button type='submit' disabled={loading} title='Entrar'>
            {loading ? <Loading /> : 'Entrar'}
          </button>
        </p>
      </div>
      <div style={{ marginTop: '80px' }}>
        <a href="/register" className="forgotPassword" title='Cadastrar-se'>
          Cadastrar-se
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
