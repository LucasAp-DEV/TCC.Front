import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { api } from '../../api';

const Login = () => {

  const Swal = require('sweetalert2')

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [loading, setRemoveLoading] = useState(false)

  const navigate = useNavigate()

  const onChangeLogin = (event) => {
    setLogin(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let errorText = "";
    try {
      setRemoveLoading(true)
      const response = await api.post('/user/login', {
        login,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const authToken = response.data.token;
        localStorage.setItem("token", authToken);
        navigate('/menu');
      }
    } catch (error) {
      errorText = "";
      Swal.fire({
        icon: "error",
        title: "Credenciais Inválidas",
        text: errorText
      });
      console.error('Erro de rede:', error);
    } finally {
      setRemoveLoading(false);
    }
  }

  return (
    <div className='container'>
      <div className='login'>
        <LoginForm
          login={login}
          password={password}
          onChangeLogin={onChangeLogin}
          onChangePassword={onChangePassword}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );

}

export default Login;