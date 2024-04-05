import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

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

  const onSubmit = async () => {
    let errorText = "";
  
    if (!login || !password) {
      errorText = "Ambos os campos são necessários.";
      Swal.fire({
        icon: "error",
        title: "Erro no Login",
        text: errorText
      });
      return;
    } 
  
    try {
      setRemoveLoading(true)
      const response = await axios.post('http://localhost:8080/auth/login', {
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
      errorText = "Credenciais Inválidas";
      Swal.fire({
        icon: "error",
        title: "Erro no Login",
        text: errorText
      });
      console.error('Erro de rede:', error);
    }finally {
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