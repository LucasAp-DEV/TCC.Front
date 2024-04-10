import './Locais.css'
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';

const Locais = () => {

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
                    <div className="api-info1" key={api.local}>
                        <h3>Descrição: {api.descricao}</h3>
                        <h3>Endereço: {api.endereco}</h3>
                        <h3>Preço: {api.price}</h3>
                        <h3>Proprietario: {api.userName}</h3>
                        {/* <img src={`data:image/jpeg;base64, ${api.images}`} alt="Imagem do Local"/> */}
                    </div>
                ))}
            </div>
        )
    }

    console.log(apiData);

    return (
        <div>
                {renderApiData()}
        </div>
    );
}


export default Locais;