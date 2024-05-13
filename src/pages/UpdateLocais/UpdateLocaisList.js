import React, { useCallback, useEffect, useState } from 'react';
import { useLocal } from '../../LocalContext';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import { Link } from 'react-router-dom';

const UpdateLocaisList = () => {

    const { setLocalData } = useLocal();

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApiData();
    }, []);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUser = decodedToken.Id;

    const fetchApiData = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/list/${idUser}`);
            setApiData(data);
            setLoading(false);
            setLocalData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderApiData = () => {
        if (loading || !apiData?.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-item1">
                {apiData.map(api => {
                    return (
                        <div className="api-item2">
                            <div className="api-item3">
                                <p>ID: {api.id}</p>
                                <p>VALOR: R$ {api.price},00</p>
                            </div>
                            <div className={"api-item3"}>
                                <p>Endereço: {api.endereco}</p>
                                <p>Cidade: {api.cidade}</p>
                            </div>
                            <div className="api-item-button">
                                <Link to={{ pathname: `/updateLocais/${api.id}` }}>
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
    );
}

export default UpdateLocaisList;
