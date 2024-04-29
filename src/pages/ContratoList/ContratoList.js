import React, { useCallback, useEffect, useState } from 'react'
import LoadingTela from '../../components/Loading/LoadingTela';
import { api } from '../../api';
import { jwtDecode } from 'jwt-decode';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useLocal } from '../../LocalContext';
import './ContratoList.css'

function ContratoList() {

    const { setLocalData } = useLocal();

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
            setLocalData(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveData = () => {
        navigate("/MENU")
    }

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-item1">
                {apiData.map(api => (
                    <div className="api-item2" key={api.id}>

                            <div className="api-item3">
                                <p>ID: {api.id}</p>
                                <p>Data: {api.data}</p>
                                <p>Valor: {api.price}</p>
                            </div>

                            <div className="api-item3">
                                <p>Locatário: {api.locatario}</p>
                                <p>Status: {api.status}</p>
                            </div>

                        <div className="api-data-button">
                            <button onClick={saveData} disabled={saving}>
                                {saving ? <Loading /> : 'Detalhes'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            {renderApiData()}
        </div>
    )
}

export default ContratoList
