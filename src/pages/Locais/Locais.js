import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import LoadingTela from '../../components/Loading/LoadingTela';
import './Locais.css'

const Locais = () => {

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApiData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/local/list');
                setApiData(data);
                setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApiData();
    }, [fetchApiData]);


    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-data">
                {apiData.map(api => (
                    <div className="api-info1" key={api.id}>
                        {api.images.length > 0 &&
                         <img src={`data:image/png;base64,${api.images[0]}`} alt="Imagem do Local" />
                        } 
                        <div className="info-column">
                            <h5>Descrição: {renderDescription(api.descricao)}</h5>
                        </div>
                        <div className="info-column">
                            <h5>Preço: R$ {api.price}</h5>
                            <h5>Proprietario: {api.userName}</h5>
                            <h5>Endereço: {truncateEdereco(api.endereco)}</h5>
                            <h5>Cidade: {api.cidade}</h5>
                        </div>
                        <div className='button-container'>
                            <Link to={{ pathname: `/contrato/${api.id}`}}>
                                <button >
                                    Contratar
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    function renderDescription(description, maxLength = 80, lineLength = 25) {
        if (description.length > maxLength) {
            const descriptionParts = [];
            let start = 0;
            while (start < description.length && descriptionParts.length < maxLength / lineLength) {
                descriptionParts.push(description.slice(start, start + lineLength));
                start += lineLength;
            }
            return <p>{descriptionParts.join('\n')}</p>;
        } else {
            return <p>{description}</p>;
        }
    }

    function truncateEdereco(description, maxLength = 20) {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    }

    return (
        <div>
            {renderApiData()}
        </div>
    );
}

export default Locais;
