import React, { useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { useParams } from 'react-router-dom';
import { api } from '../../api';

const UpdateLocais = () => {
    const { idLocal } = useParams();

    const [localData, setLocalData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchContrato();
    }, []);

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/${idLocal}`);
            setLocalData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const renderApi = () => {
        if (loading === true) {
            return <LoadingTela />;
        }
        return (
            <div>
                <h1>Teste</h1>
                <h1>Teste</h1>
                <h1>Teste</h1>
                <h1>Teste</h1>
                <h1>Teste</h1>
                <h1>Teste</h1>
            </div>
        );
    }


    return (
        <div>
            {renderApi()}
        </div>
    )
}

export default UpdateLocais;