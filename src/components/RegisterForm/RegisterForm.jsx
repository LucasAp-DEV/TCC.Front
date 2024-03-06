import Button from '../Button/Button';
import Input from '../Button/Input';
import './Registerform.css'

const RegisterForm = ({ login, onChangeLogin, password, onChangePassword, name, onChangeName, 
        email, onChangeEmail, telefone, onChangeTelefone, cidade, onChangeCidade,
        role, onchangeRole, onSubmit, }) => {

            return (
                <div className='register'>

            <h1 >Faça seu registro</h1>   
            <div className='inputContainer'>

            <div className='loginBox'>
            <p>Login:</p>       
            <Input
                placeholder={"Digite seu login"}
                type='text'
                name='LoginInput'
                value={login}
                onChange={onChangeLogin}
                />
                </div>

                <div className='senhaBox'>
                    <p>Senha:</p>
            <Input
                placeholder={"Digite sua senha"}
                type='password'
                name='passwordInput'
                value={password}
                onChange={onChangePassword}
                />
                </div>

                <div className='nomeBox'>
                    <p>Nome:</p>
            <Input
                placeholder={"Digite seu nome"}
                type='text'
                name='nameInput'
                value={name}
                onChange={onChangeName}
                />
                </div>

                <div className='emailBox'>
                    <p>Email:</p>
            <Input
                placeholder={"Digite seu email"}
                type='email'
                name='emailInput'
                value={email}
                onChange={onChangeEmail}
                />
                </div>

                <div className='telefoneBox'>
                    <p>Telefone:</p>
            <Input
                placeholder={"Digite seu telefone"}
                type='phone'
                name='telefoneInput'
                value={telefone}
                onChange={onChangeTelefone}
                />
                </div>

                <div className='cidadeBox'>
                    <p>Cidade:</p>
            <Input
                placeholder={"Digite sua cidade"}
                type='text'
                name='cidadeInput'
                value={cidade}
                onChange={onChangeCidade}
                />
                </div>
            </div>  

            <div className='checkBox'>
            <h3>Você é um proprietário?</h3>
            <input
                type='checkbox'
                name='roleInput'
                value={role}
                onChange={onchangeRole}
                />
                <p>Sim</p>

                </div>
            <p>
                <Button onClick={onSubmit} text='Registrar' />
            </p>
        </div>
    );
}

export default RegisterForm
