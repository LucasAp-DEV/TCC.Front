import React, { useState } from 'react';
import Select from 'react-select';
import Loading from '../Loading/Loading';
import './RegisterLocaisForm.css';
import Swal from 'sweetalert2';

const RegisterLocaisForm = ({ endereco, onChangeEndereco, descricao, onChangeDescricao, cidade, onChangeCidade,
    onChangeImage, valor, onChangeValor, onSubmit, loading, cidadesOptions }) => {

    const [imagemSelecionada, setImagemSelecionada] = useState(false);
    const [arrayImagens, setArrayImagens] = useState([])

    const renderCityOptions = () => {
        return cidadesOptions.map((cidade) => ({
            value: cidade.id,
            label: cidade.name
        }));
    };

    const handleCityChange = (selectedOption) => {
        onChangeCidade(selectedOption.value);
    };

    const onChangeImagem = (event) => {
        const files = event.target.files;
        const imagensArray = Array.from(files);
        setImagemSelecionada(files.length > 0);
        setArrayImagens(imagensArray);
        onChangeImage(event);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!imagemSelecionada || arrayImagens.length < 2) {
            Swal.fire({
                icon: "error",
                title: "Favor insira pelo menos duas imagens",
                text: ""
            });
            return;
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <label>Descrição:</label>
                <textarea
                    required
                    style={{
                        resize: 'none',
                        fontFamily: 'Arial, sans-serif'
                    }}
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
                    required
                    style={{
                        resize: 'none',
                        fontFamily: 'Arial, sans-serif'
                    }}
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
                    required
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
                    required
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
                    onChange={onChangeImagem}
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
