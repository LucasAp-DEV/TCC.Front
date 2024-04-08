import Button from '../Button/Button';
import './Registerform.css'
import Loading from '../Loading/Loading';

const RegisterForm = ({ login, onChangeLogin, password, onChangePassword, nome, onChangeName,
    email, onChangeEmail, telephone, onChangeTelefone, passwordValid, onChangePasswordValid,
    role, onchangeRole, onSubmit, loading }) => {

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

                <div className='cidadeBox'>
                    <p>Confirme sua Senha</p>
                    <input
                        placeholder={"Digite sua cidade"}
                        type='password'
                        name='passwordValid'
                        value={passwordValid}
                        onChange={onChangePasswordValid}
                    />
                </div>

                <div className='nomeBox'>
                    <p>Nome:</p>
                    <input
                        placeholder={"Digite seu nome"}
                        type='text'
                        nome='nameInput'
                        value={nome}
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
                        value={telephone}
                        onChange={onChangeTelefone}
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
                <Button
                    onClick={onSubmit}
                    text={loading ? <Loading /> : 'Registrar'}
                    disabled={loading}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/login" className='exitPassword'>Voltar ao Login</a>
            </div>
        </div>
    );
}

export default RegisterForm
