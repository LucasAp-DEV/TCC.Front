import React, { useCallback, useEffect, useState } from 'react'
import LoadingTela from '../../components/Loading/LoadingTela';
import { api } from '../../api';
import { jwtDecode } from 'jwt-decode';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

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
            console.log(apiData);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }

        const saveData = () => {
            navigate("/contratos")
        }

        return (
            <div>
                {apiData.map(api => (
                    <div key={api.id}>
                        <div>
                            <h5>data {api.data}</h5>
                            <h5>status: {api.status}</h5>
                            <h5>locador: {api.locador}</h5>
                            <h5>lacatario: {api.locatario}</h5>
                            <h5>local: {api.local}</h5>
                        </div>
                        <div>
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
