import './Registerform.css'
import Loading from '../Loading/Loading';

const RegisterForm = ({ login, onChangeLogin, password, onChangePassword, nome, onChangeName,
    email, onChangeEmail, telefone, onChangeTelefone, passwordValid, onChangePasswordValid,
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
                        value={login}
                        onChange={onChangeLogin}
                        title='Login'
                        required
                    />
                </div>

                <div className='senhaBox'>
                    <p>Senha:</p>
                    <input
                        placeholder={"Digite sua senha"}
                        type='password'
                        value={password}
                        onChange={onChangePassword}
                        title='Senha'
                        required
                    />
                </div>

                <div className='cidadeBox'>
                    <p>Confirme sua Senha:</p>
                    <input
                        placeholder={"Digite sua cidade"}
                        type='password'
                        value={passwordValid}
                        onChange={onChangePasswordValid}
                        title='Confirmar senha'
                        required
                    />
                </div>

                <div className='nomeBox'>
                    <p>Nome:</p>
                    <input
                        placeholder={"Digite seu nome"}
                        type='text'
                        value={nome}
                        onChange={onChangeName}
                        title='Nome'
                        required
                    />
                </div>

                <div className='emailBox'>
                    <p>Email:</p>
                    <input
                        placeholder={"Digite seu email"}
                        type='email'
                        value={email}
                        onChange={onChangeEmail}
                        title='Email'
                        required
                    />
                </div>

                <div className='telefoneBox'>
                    <p>Telefone:</p>
                    <input
                        placeholder={"Digite seu telefone"}
                        type='phone'
                        pattern="[0-9]*"
                        value={telefone}
                        onChange={onChangeTelefone}
                        title='Telefone'
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
                <button type='submit' disabled={loading} title='Registrar'>
                    {loading ? <Loading /> : 'Registrar'}
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/login" className='exitPassword' title='Voltar'>Voltar ao Login</a>
            </div>
        </form>
    );
}

export default RegisterForm
