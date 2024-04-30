import React, { useCallback, useEffect, useState } from 'react'
import LoadingTela from '../../components/Loading/LoadingTela';
import { api } from '../../api';
import { jwtDecode } from 'jwt-decode';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import './ContratoList.css'

function ContratoList() {

    const navigate = useNavigate()
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveData = () => {
        navigate("/ContratoDetalhes")
    }

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-item1">
                {apiData.map(api => {
                    let statusColorClass = '';
                    if (api.status === 'ABERTO') {
                        statusColorClass = 'orange-background';
                    } else if (api.status === 'ENCERRADO') {
                        statusColorClass = 'green-background';
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
                                <button onClick={saveData} disabled={saving}>
                                    {saving ? <Loading /> : 'Detalhes'}
                                </button>
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
