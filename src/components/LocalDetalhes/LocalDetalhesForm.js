import React from 'react'

function LocalDetalhesForm({localData}) {
    return (
        <div>
            <div>
                <p>teste</p>
                <p>teste</p>
                <div>
                    {localData?.images.map((images) => (
                        <img src={`data:image/png;base64,${images}`} alt={"Imagem"} style={{ width: '1000px', height: '400px' }} />
                    ))}
                </div>
                <p>Telefone: {localData?.locatarioTell}</p>
                <p>Cidade: {localData?.cidade}</p>
                <p>Locatario: {localData?.locatarioName}</p>
                <p>Valor: {localData?.price}</p>
                <p>Descrição: {localData?.descricao}</p>
                <p>Endereço: {localData?.endereco}</p>
            </div>
        </div>
    )
}

export default LocalDetalhesForm;
