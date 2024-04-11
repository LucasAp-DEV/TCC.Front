import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useLocal } from '../../LocalContext';
import './Contrato.css';

const Contrato = () => {
    const { localData } = useLocal();

    if (!localData) {
        return <div>Nenhum local foi selecionado.</div>;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const nomeLocatario = decodedToken.Name;

    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return (
        <div className="contrato">
            <div className="content">
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
                    <p>Locatario:<strong>{nomeLocatario}</strong> Data: <strong>{dataFormatada}</strong></p>
                </div>
            </div>
        </div>
    );
}

export default Contrato;
