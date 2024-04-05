import React from 'react';
import './BoxItem.css';

const BoxItem = ({ nome, endereco, valor, ddd, contato }) => {
    return (
        <div className='boxItemContainer'>
            <div className='boxItem'>

                <p>Nome: {nome} </p>
                <p>Valor: R${valor} </p>
                <p>Endereço: {endereco} </p>
                <p>Contato: ({ddd}) {contato} </p>
            </div>
            <div>
                <h1>Contratar</h1>
            </div>
        </div>

    );
}

export default BoxItem