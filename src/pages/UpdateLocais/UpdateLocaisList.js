import React, { useEffect, useState } from 'react';
import { useLocal } from '../../LocalContext';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateLocaisList = () => {
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

    const fetchApiData = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/list/${idUser}`);
            setApiData(data);
            setLoading(false);
            setLocalData(data);
            if (!data.length) {
                Swal.fire({
                    title: 'Você não possui locais.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            }
        } catch (error) {
            setError(error.response ? error.response.data : 'Erro ao buscar locais');
            setLoading(false);
        }
    };

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
                    return (
                        <div className="api-item2" key={api.id}>
                            <div className="api-item3">
                                <p>ID: {api.id}</p>
                                <p>Cidade: {api.cidade}</p>
                                <p>Endereço: {api.endereco}</p>
                            </div>
                            <div className={"api-item3"}>
                                <p 
                                style={{
                                    backgroundColor: api.status === 'PATROCINADO' ? 'yellow' : 'orange',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    fontWeight: 'bold',
                                    color:'black',
                                    width: '50%',
                                    textAlign: 'center'
                                }}
                            >
                                STATUS: {api.status}
                            </p>
                            </div>
                            <div style={{marginTop: '1.5%'}}>
                                <Link to={{ pathname: `/updatelocais/${api.id}` }}>
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
