import Button from '../Button/Button';
import './Registerform.css'

const RegisterForm = ({ login, onChangeLogin, password, onChangePassword, name, onChangeName,
    email, onChangeEmail, telefone, onChangeTelefone, cidade, onChangeCidade,
    role, onchangeRole, onSubmit, }) => {

    return (
        <div className='register'>
                <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Faça seu registro</h1>

                <div className='inputContainer'>

                    <div className='loginBox'>
                        <p>Login:</p>
                        <input
                            placeholder={"Digite seu login"}
                            type='text'
                            name='LoginInput'
                            value={login}
                            onChange={onChangeLogin}
                        />
                    </div>

                    <div className='senhaBox'>
                        <p>Senha:</p>
                        <input
                            placeholder={"Digite sua senha"}
                            type='password'
                            name='passwordInput'
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>

                    <div className='nomeBox'>
                        <p>Nome:</p>
                        <input
                            placeholder={"Digite seu nome"}
                            type='text'
                            name='nameInput'
                            value={name}
                            onChange={onChangeName}
                        />
                    </div>

                    <div className='emailBox'>
                        <p>Email:</p>
                        <input
                            placeholder={"Digite seu email"}
                            type='email'
                            name='emailInput'
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </div>

                    <div className='telefoneBox'>
                        <p>Telefone:</p>
                        <input
                            placeholder={"Digite seu telefone"}
                            type='phone'
                            name='telefoneInput'
                            value={telefone}
                            onChange={onChangeTelefone}
                        />
                    </div>

                    <div className='cidadeBox'>
                        <p>Cidade:</p>
                        <input
                            placeholder={"Digite sua cidade"}
                            type='text'
                            name='cidadeInput'
                            value={cidade}
                            onChange={onChangeCidade}
                        />
                    </div>
                </div>

                <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Você é um proprietário?</h3>

                <div className='checkBox'>
                    <input
                        type='checkbox'
                        name='roleInput'
                        value={role}
                        onChange={onchangeRole}
                    />

                </div>
                <div>
                    <Button onClick={onSubmit} text='Registrar' />
                </div>
                
                <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Cancelar Cadastro</h3>
        </div>
    );
}

export default RegisterForm
