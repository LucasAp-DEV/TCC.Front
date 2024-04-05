import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'
import { useState } from 'react';
import { api } from '../../api';

const Register = () => {

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [telefone, setTelefone] = useState();
  const [role, setRole] = useState('USER');
  const [errorRegister, setErrorRegister] = useState();

  const token = localStorage.getItem('token');


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

  const onChangeRole = () => {
    setRole((currentRole) => (currentRole === 'USER' ? 'ADMIN' : 'USER')); //ALTERAR ROLE ENTRE ADMIN E USER
  }

  const onSubmit = async () => {

    if (!login || !password) {
      setErrorRegister("Por favor insira as credenciais.");
      return;
    }


    try {
      const response = await api.post('/auth/register', {
        login,
        password,
        role
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        console.log('Cadastro bem-sucedido:', response.data);
        setErrorRegister('Registrado com Sucesso');

        setLogin("");
        setPassword("");

      } else {
        const data = await response.json();
        setErrorRegister(data.error || 'Erro ao Registrar usuario');
        console.log("Erro ao reristrar usuario");
      }

    } catch (error) {
      setErrorRegister('Você não possui permissão');
      console.error('Erro no cadastro:', error);
    }

  }

  console.log(password, login, role);

  return (
      <div className='container'>
        <div className='form'>
          <RegisterForm
            login={login}
            password={password}
            name={name}
            email={email}
            telefone={telefone}
            role={role}
            onChangeName={onChangeName}
            onChangeEmail={onChangeEmail}
            onChangeTelefone={onChangeTelefone}
            onChangeLogin={onChangeLogin}
            onChangePassword={onChangePassword}
            onchangeRole={onChangeRole}
            onSubmit={onSubmit}
          />
        </div>
      </div>
  )
}

export default Register





