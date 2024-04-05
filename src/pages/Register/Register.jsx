import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'
import { useState } from 'react';
import { api } from '../../api';

const Register = () => {

  const Swal = require('sweetalert2')

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [telefone, setTelefone] = useState();
  const [role, setRole] = useState('USER');
  const [loading, setRemoveLoading] = useState();

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
    let errorText = "";

    if (!login || !password) {
      errorText = "Ambos os campos são necessários.";
      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar",
        text: errorText
      });
      return;
    }


    try {
      setRemoveLoading(true)
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
        errorText = "Erro ao Cadastrar";
        Swal.fire({
        icon: "success",
        title: "Cadastro Realizado",
        text: errorText
      });
        setLogin("");
        setPassword("");

      } else {
        console.log("Erro ao reristrar usuario");
      }
    } catch (error) {
      errorText = "Erro ao Cadastrar";
      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar",
        text: errorText
      });
      console.error('Erro no cadastro:', error);
    }finally {
      setRemoveLoading(false);
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
            loading={loading}
          />
        </div>
      </div>
  )
}

export default Register





