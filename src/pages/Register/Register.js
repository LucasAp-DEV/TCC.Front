import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'
import { useState } from 'react';
import { api } from '../../api';

const Register = () => {

  const Swal = require('sweetalert2')

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [nome, setName] = useState();
  const [email, setemail] = useState();
  const [telephone, setTelefone] = useState();
  const [role, setRole] = useState('USER');
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
    setRole((currentRole) => (currentRole === 'USER' ? 'ADMIN' : 'USER')); //ALTERAR ROLE ENTRE ADMIN E USER
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
    const formData = { login, password, nome, email, telephone, passwordValid };

    // if (!Object.values(formData).every(field => field)) {
    //   showErrorAlert("Todos os campos são necessários.");
    //   return;
    // }

    if (password !== passwordValid) {
      showErrorAlert("As Senhas nao conferem");
      return;
    }

    if (!isPhoneNumberValid(formData.telephone)) {
      showErrorAlert("Digite corretamente o numero de telefone");
      return;
    }

    try {
      setRemoveLoading(true);
      const response = await api.post('/user/register', {
        login,
        password,
        role,
        nome,
        email,
        telephone
      });
      console.log('Cadastro bem-sucedido:', response.data);
      showSucessAlert("Cadastro realizado");
      setLogin("");
      setPassword("");
      setName("");
      setemail("");
      setPasswordValid("");
      setTelefone("");
    } catch (error) {
      showErrorAlert("Erro ao Registrar");
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
          telephone={telephone}
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





