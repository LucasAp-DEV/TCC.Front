import React from 'react';

const DetalhesLocal2 = ({ localData }) => {
    return (
        <div style={{marginTop: "100px"}}>
            <p>Por este instrumento particular, <strong>{localData.locatario}</strong>, doravante denominado LOCADOR, e <strong>{localData.locador}</strong>, doravante denominado LOCATÁRIO,</p>
            <p>firmam o presente contrato de locação do local descrito abaixo:</p>
            <div>
                <h2>Detalhes do Local:</h2>
                <p><strong>Endereço:</strong> {localData.endereco}</p>
                <p><strong>Cidade:</strong> {localData.name}</p>
                <p><strong>Preço:</strong> R$ {localData.price},00</p>
                <p><strong>Telefone:</strong> (44) {localData.telephone}</p>
                <p><strong>Status:</strong> {localData.status}</p>
            </div>
            <div>
                <p><strong>Data:</strong> {localData.data} </p>
            </div>
        </div>
    );
}

export default DetalhesLocal2;
