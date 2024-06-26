import React from 'react';
import dayjs from 'dayjs';

const DetalhesLocal2 = ({ localData }) => {

    const getStatusLabel = (status) => {
        if (status === 'ABERTO') {
            return 'ABERTO';
        } else if (status === 'ENCERRADO') {
            return 'ENCERRADO';
        } else if (status === 'AGENDADO') {
            return 'AGENDADO';
        } else {
            return 'INDEFINIDO';
        }
    };

    return (
        <div>
            <p>Por este instrumento particular, <strong>{localData?.locatario}</strong>, doravante denominado LOCADOR, e <strong>{localData?.locador}</strong>, doravante denominado</p>
            <p>LOCATÁRIO, firmam o presente contrato de locação do local descrito abaixo:</p>
            <div>
                <h2>Detalhes do Local:</h2>
                <p><strong>Endereço:</strong> {localData?.endereco}</p>
                <p><strong>Cidade:</strong> {localData?.cidade}</p>
                <p><strong>Preço: R$ {localData?.price},00 </strong></p>
                <p><strong>Telefone:</strong> (44) {localData?.telephone}</p>
                <p><strong>Status:</strong> {getStatusLabel(localData?.status)}</p>
            </div>
            <p>O LOCATÁRIO declara estar ciente e de acordo com os termos deste contrato e se compromete a respeitá-los integralmente.</p>
            <div>
                <p><strong>Data:</strong> {dayjs(localData?.data).format('DD/MM/YYYY')} </p>
            </div>
        </div>
    );
}

export default DetalhesLocal2;
