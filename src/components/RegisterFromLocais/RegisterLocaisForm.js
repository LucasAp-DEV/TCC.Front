import React from 'react';
import Loading from '../Loading/Loading';

const RegisterLocaisForm = ({ endereco, onChangeEndereco, descricao, onChangeDescricao, cidade, onChangeCidade,
    image, onChangeImage, valor, onChangeValor, onSubmit, loading, cidadesOptions, searchTerm, onChangeSearchTerm }) => {

    return (
        <form onSubmit={onSubmit}>
            <div>
                <div>
                    <p>Endereço:</p>
                    <input
                        type='text'
                        name='EndereçoInput'
                        value={endereco}
                        onChange={onChangeEndereco}
                        // required
                    />
                </div>

                <div>
                    <p>Descrição:</p>
                    <input
                        type='text'
                        name='DescriçãoInput'
                        value={descricao}
                        onChange={onChangeDescricao}
                    />
                </div>

                <div>
                    <p>Valor:</p>
                    <input
                        type='number'
                        name='ValorInput'
                        value={valor}
                        onChange={onChangeValor}
                    />
                </div>

                <div>
                    <p>Cidade:</p>
                    <input
                        type='text'
                        name='CidadeInput'
                        value={cidade}
                        onChange={onChangeCidade}
                    />
                    <select value={cidade} onChange={onChangeCidade}>
                        {cidadesOptions.map((cidadeOption) => (
                            <option key={cidadeOption.value} value={cidadeOption.value}>{cidadeOption.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p>Imagens:</p>
                    <input
                        type='file'
                        multiple
                        name='ImagensInput'
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

export default RegisterLocaisForm;
