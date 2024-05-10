import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import LocalDetalhesForm from '../../components/LocalDetalhes/LocalDetalhesForm';

function LocalDetalhe() {
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
        } return (
            <div>
                <div>
                    <LocalDetalhesForm
                    localData={localData}
                    />
                </div>
                <div>
                    <Link to={{ pathname: `/contrato/${localData?.id}` }}>
                        <button className="button-contratar">
                            Contratar
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderApi()}
        </div>
    )
}

export default LocalDetalhe;
