import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { api } from '../../api';

const Login = () => {

  const Swal = require('sweetalert2')

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
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
        navigate('/locais');
      }
    } catch (error) {
      if (error.response) {
        errorText = "Credenciais invalidas";
      } else if (error.request) {
        errorText = "Servidor não disponível.";
      } else {
        errorText = "Ocorreu um erro inesperado. Por favor, tente mais tarde.";
      }
      Swal.fire({
        icon: "error",
        title: errorText,
        text: ''
      });
      console.error('Erro:', error);
      localStorage.removeItem('token')
    } finally {
      setLoading(false);
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
