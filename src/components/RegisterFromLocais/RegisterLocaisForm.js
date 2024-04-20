import Loading from '../Loading/Loading';

const RegisterLocaisForm = ({ endereco, onChangeEndereco, descricao, onChangeDescricao, cidade, onChangeCidade,
    image, onChangeImage, valor, onChangeValor, onSubmit, loading }) => {

    return (
        <form onSubmit={onSubmit}>
            <div >
                <div >
                    <p></p>
                    <a>Endereço:</a>
                    <input
                        type='text'
                        name='EndereçoInput'
                        value={endereco}
                        onChange={onChangeEndereco}
                        // required
                    />
                </div>

                <div>
                    <p></p>
                    <a>Descrição:</a>
                    <input
                        type='text'
                        name='DescriçãodInput'
                        value={descricao}
                        onChange={onChangeDescricao}
                        // required
                    />
                </div>

                <div>
                    <p></p>
                    <a>Valor:</a>
                    <input
                        type='number'
                        name='ValorInput'
                        value={valor}
                        onChange={onChangeValor}
                        // required
                    />
                </div>

                <div>
                    <p></p>
                    <a>Cidade</a>
                    <input
                        type='text'
                        nome='CidadeInput'
                        value={cidade}
                        onChange={onChangeCidade}
                        // required
                    />
                </div>

                <div >
                    <p></p>
                    <a>Imagens</a>
                    <input
                        type='file'
                        multiple
                        name='ImagenInput'
                        value={image}
                        onChange={onChangeImage}
                        required
                    />
                </div>

            </div>
            <div>
                <p></p>
                <button type='submit' disabled={loading}>
                    {loading ? <Loading /> : 'Registrar'}
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/menu">Voltar aos Locais</a>
            </div>
        </form>
    );
}

export default RegisterLocaisForm
