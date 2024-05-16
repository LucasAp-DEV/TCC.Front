import React from 'react';
import Select from 'react-select';
import Loading from '../Loading/Loading';
import './RegisterLocaisForm.css';

const RegisterLocaisForm = ({ endereco, onChangeEndereco, descricao, onChangeDescricao, cidade, onChangeCidade,
    onChangeImage, valor, onChangeValor, onSubmit, loading, cidadesOptions }) => {

    const renderCityOptions = () => {
        return cidadesOptions.map((cidade) => ({
            value: cidade.id,
            label: cidade.name
        }));
    };

    const handleCityChange = (selectedOption) => {
        onChangeCidade(selectedOption.value);
    };

    return (
        <form onSubmit={onSubmit} className="form-container">
            <div>
                <label>Descrição:</label>
                <textarea
                    style={{resize: 'none',
                    fontFamily: 'Arial, sans-serif'}}
                    rows={9}
                    type='text'
                    id="descricao"
                    className="form-input"
                    value={descricao}
                    onChange={onChangeDescricao}
                />
            </div>
            <div>
                <label>Endereço:</label>
                <textarea
                    style={{resize: 'none',
                    fontFamily: 'Arial, sans-serif'}}
                    type='text'
                    rows={1}
                    id="endereco"
                    className="form-input"
                    value={endereco}
                    onChange={onChangeEndereco}
                />
            </div>

            <div>
                <label>Valor:</label>
                <input
                    type='number'
                    id="valor"
                    className="form-input"
                    value={valor}
                    onChange={onChangeValor}
                />
            </div>

            <div>
                <label>Cidade:</label>
                <Select
                    value={cidade}
                    onChange={handleCityChange}
                    options={renderCityOptions()}
                    placeholder="Selecione a cidade.."
                    maxMenuHeight={100}
                    className="form-select"
                />

            </div>

            <div>
                <label htmlFor="imagens">Imagens:</label>
                <input
                    type='file'
                    id="imagens"
                    className="form-input"
                    multiple
                    name='ImagensInput'
                    onChange={onChangeImage}
                />
            </div>
            <div>
                <button type='submit' className="form-submit" disabled={loading}>
                    {loading ? <Loading /> : 'Registrar'}
                </button>
                <div className="form-link">
                    <a href="/menu">Voltar aos Locais</a>
                </div>
            </div>
        </form>
    );
}

export default RegisterLocaisForm;
