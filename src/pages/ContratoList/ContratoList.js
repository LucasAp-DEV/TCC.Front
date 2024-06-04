import React, { useCallback, useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { api } from '../../api';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import './ContratoList.css';
import { useLocal } from '../../LocalContext';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function ContratoList() {
    const { setLocalData } = useLocal();

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            console.log(data);
            if (data.length === 0) {
                Swal.fire({
                    title: 'Você não possui contratos.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            setError(error.response ? error.response.data : 'Erro ao buscar contratos');
        } finally {
            setLoading(false);
        }
    }, [setLocalData, idUser]);

    const renderApiData = () => {
        if (loading) {
            return <LoadingTela />;
        }
        if (error) {
            return <div>{error}</div>;
        }
        return (
            <div className="api-item1">
                {apiData.map(api => {
                    let statusColorClass = '';
                    if (api.status === 'ABERTO') {
                        statusColorClass = 'yellow-background';
                    } else if (api.status === 'ENCERRADO') {
                        statusColorClass = 'green-background';
                    } else if (api.status === 'AGENDADO') {
                        statusColorClass = 'orange-background';
                    }
                    return (
                        <div className="api-item2" key={api.id}>
                            <div className="api-item3">
                            <p>DATA: {dayjs(api.data).format('DD/MM/YYYY')}</p> {/*INSERIR NAS DEMAIS PAGINAS */}
                                <p>VALOR: R$ {api.price},00</p>
                            </div>
                            <div className="api-item3">
                                <p>LOCADOR: {api.locatario}</p>
                                <div className={`api-item3 ${statusColorClass}`}>
                                    <p style={{textAlign: 'center', padding: '2px'}}>STATUS: {api.status}</p>
                                </div>
                            </div>
                            <div className="api-item-button">
                                <Link to={{ pathname: `/contratoDetalhes/${api.id}` }}>
                                    <button title="Detalhes">Detalhes</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return <div>{renderApiData()}</div>;
}

export default ContratoList;
