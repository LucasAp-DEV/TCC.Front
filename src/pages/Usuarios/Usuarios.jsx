import './Usuarios.css'
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';

const Usuarios = () => {

    const [apiData, setApiData] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        fetchApiData()
        setLoading(0)
    }, [])

    const fetchApiData = useCallback(async () => {
        try {
            const { data } = await api.get('/auth/user')
            setApiData(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return (<h1>Carregando</h1>)
        } 
        return (
            <div className="api-data-container">
                {apiData.map(api => (
                    <div className="api-info" key={api.login}>
                        <h3>ID: {api.id}</h3>
                        <h3>Login: {api.login}</h3>
                        <h3>Role: {api.role}</h3>
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


export default Usuarios;