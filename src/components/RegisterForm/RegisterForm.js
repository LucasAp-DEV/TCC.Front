import './Registerform.css'
import Loading from '../Loading/Loading';

const RegisterForm = ({ login, onChangeLogin, password, onChangePassword, nome, onChangeName,
    email, onChangeEmail, telephone, onChangeTelefone, passwordValid, onChangePasswordValid,
    role, onchangeRole, onSubmit, loading }) => {

    return (
        <form className='register' onSubmit={onSubmit}>
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
                        required
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
                        required
                    />
                </div>

                <div className='cidadeBox'>
                    <p>Confirme sua Senha:</p>
                    <input
                        placeholder={"Digite sua cidade"}
                        type='password'
                        name='passwordValid'
                        value={passwordValid}
                        onChange={onChangePasswordValid}
                        required
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
                        required
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
                        required
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
                        required
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
                <button type='submit' disabled={loading}>
                    {loading ? <Loading /> : 'Registrar'}
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/login" className='exitPassword'>Voltar ao Login</a>
            </div>
        </form>
    );
}

export default RegisterForm
