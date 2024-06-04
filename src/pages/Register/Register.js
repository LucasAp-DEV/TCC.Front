import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'
import { useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const Swal = require('sweetalert2')

  const navigate = useNavigate();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [nome, setName] = useState();
  const [email, setemail] = useState();
  const [telefone, setTelefone] = useState();
  const [role, setRole] = useState('LOCATARIO');
  const [loading, setRemoveLoading] = useState();
  const [passwordValid, setPasswordValid] = useState();


  const onChangeLogin = (event) => {
    setLogin(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangeEmail = (event) => {
    setemail(event.target.value)
  }

  const onChangeTelefone = (event) => {
    setTelefone(event.target.value)
  }

  const onChangePasswordValid = (event) => {
    setPasswordValid(event.target.value)
  }

  const onChangeRole = () => {
    setRole((currentRole) => (currentRole === 'LOCATARIO' ? 'LOCADOR' : 'LOCATARIO'))
  }

  function showErrorAlert(message) {
    Swal.fire({
      icon: "error",
      title: "Erro ao Cadastrar",
      text: message
    });
  }

  function showSucessAlert(message) {
    Swal.fire({
      icon: "success",
      title: "Cadastro Realizado",
      text: message
    });
  }

  function isPhoneNumberValid(phoneNumber) {
    return /^\d{2}\d{8,9}$/.test(phoneNumber);
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = { login, password, nome, email, telefone, passwordValid, role };

    if (password !== passwordValid) {
      showErrorAlert("As Senhas nao conferem");
      return;
    }

    if (!isPhoneNumberValid(formData.telefone)) {
      showErrorAlert("Digite corretamente o numero de telefone");
      return;
    }

    try {
      setRemoveLoading(true);
      const response = await api.post('/user/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      showSucessAlert("Cadastro realizado");
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (error.response.data === "Nome de usuario em uso") {
          showErrorAlert("Nome de usuario em uso");
        } else if (error.response.data === "Email ja esta em uso") {
          showErrorAlert("Email já está em uso");
        } else {
          showErrorAlert("Erro ao Registrar");
        }
      } else {
        showErrorAlert("Erro ao Registrar");
      }
    } finally {
      setRemoveLoading(false);
    }
  }

  return (
    <div className='container'>
      <div className='form'>
        <RegisterForm
          login={login}
          password={password}
          nome={nome}
          email={email}
          telephone={telefone}
          role={role}
          passwordValid={passwordValid}
          onChangeName={onChangeName}
          onChangeEmail={onChangeEmail}
          onChangeTelefone={onChangeTelefone}
          onChangeLogin={onChangeLogin}
          onChangePassword={onChangePassword}
          onchangeRole={onChangeRole}
          onChangePasswordValid={onChangePasswordValid}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Register





