import './Locais.css'
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom'

const Locais = () => {

    const navigate = useNavigate()

    const [apiData, setApiData] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        fetchApiData()
        setLoading(0)
    }, [])

    const fetchApiData = useCallback(async () => {
        try {
            const { data } = await api.get('/local/list')
            setApiData(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return (<h1>Carregando2</h1>)
        }
        return (
            <div className="api-data">
                {apiData.map(api => (
                    <div className="api-info1" key={api.id}>
                        {api.images && api.images.length > 0 &&
                            <img src={`data:image/jpeg;base64, ${api.images[0]}`} alt="Imagem do Local" />
                        }
                        <div className="info-column">
                            <h3>Descrição: {renderDescription(api.descricao)}</h3>
                        </div>
                        <div className="info-column">
                            <h3>Preço: R$ {api.price}</h3>
                            <h3>Proprietario: {api.userName}</h3>
                            <h3>Endereço: {truncateEdereco(api.endereco)}</h3>
                        </div>
                        <div className='button-container'>
                            <Button onClick={() => { navigate('/menu') }}
                                text='Contratar' alt='Contratar' title='Contrara'
                            />
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

    console.log(apiData);

    return (
        <div>
            {renderApiData()}
        </div>
    );
}


export default Locais;


// Locais por ID
// const fetchApiData = useCallback(async () => {
//     try {
//         const { data } = await api.get('/local/list/1');
//         setApiData(data);
//     } catch (error) {
//         console.error(error);
//     }
// }, []);

// const renderApiData = () => {
//     if (loading || !apiData) {
//         return (<h1>Carregando</h1>);
//     }
//     return (
//         <div className="api-data">
//             <div className="api-info1" key={apiData.local}>
//                 <h3>Descrição: {apiData.descricao}</h3>
//                 <h3>Endereço: {apiData.endereco}</h3>
//                 <h3>Preço: {apiData.price}</h3>
//                 <h3>Proprietario: {apiData.userName}</h3>
//                 {apiData.images &&
//                     <img src={`data:image/jpeg;base64, ${apiData.images}`} alt="Imagem do Local"/>
//                 }
//             </div>
//         </div>
//     );
// };
