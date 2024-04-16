import React from 'react';

const DetalhesContrato = ({ localData, nomeLocatario, dataAluguel, handleDataAluguelChange }) => {
    return (
        <div>
            <p>Por este instrumento particular, <strong>{localData.userName}</strong>, doravante denominado LOCADOR, e <strong>{nomeLocatario}</strong>, doravante denominado LOCATÁRIO, firmam o presente contrato de locação do local descrito abaixo:</p>
            <div className="info-section">
                <h2>Detalhes do Local:</h2>
                <p><strong>ID do Local:</strong> {localData.id}</p>
                <p><strong>Descrição:</strong> {localData.descricao}</p>
                <p><strong>Endereço:</strong> {localData.endereco}, {localData.cidade}</p>
                <p><strong>Preço:</strong> R$ {localData.price}</p>
                <p><strong>Telefone:</strong> {localData.userTell}</p>
            </div>
            <p>O LOCATÁRIO declara estar ciente e de acordo com os termos deste contrato e se compromete a respeitá-los integralmente.</p>
            <div>
                <a>Insira uma data para locação: </a>
                <input type="date" placeholder="Data do Aluguel" value={dataAluguel} onChange={handleDataAluguelChange} />
            </div>
        </div>
    );
}

export default DetalhesContrato;
