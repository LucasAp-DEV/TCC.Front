import React, { useCallback, useEffect, useState } from 'react'
import LoadingTela from '../../components/Loading/LoadingTela';
import { api } from '../../api';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import './ContratoList.css'
import { useLocal } from '../../LocalContext';

function ContratoList() {

    const { setLocalData } = useLocal();

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApiData();
    }, []);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUser = decodedToken.Id;

    const fetchApiData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contrato/user/${idUser}`);
            setApiData(data);
            setLoading(false);
            setLocalData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [setLocalData]);

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-item1">
                {apiData.map(api => {
                    let statusColorClass = '';
                    if (api.status === 'ABERTO') {
                        statusColorClass = 'yellow-background';
                    } else if (api.status === 'ENCERRADO') {
                        statusColorClass = 'green-background';
                    }else if (api.status === 'AGENDADO') {
                        statusColorClass = 'orange-background';
                    }
                    return (
                        <div className="api-item2" key={api.id}>
                            <div className="api-item3">
                                <p>DATA: {api.data}</p>
                                <p>VALOR: R$ {api.price},00</p>
                            </div>
                            <div className={"api-item3"}>
                                <p>LOCATARIO: {api.locatario}</p>
                                <div className={`api-item3 ${statusColorClass}`}>
                                    <p>STATUS: {api.status}</p>
                                </div>
                            </div>
                            <div className="api-item-button">
                                <Link to={{ pathname: `/contratoDetalhes/${api.id}`}}>
                                    <button >
                                        Detalhes
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            {renderApiData()}
        </div>
    )
}

export default ContratoList
