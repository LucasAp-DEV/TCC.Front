import React, { useEffect, useState } from 'react';
import DetalhesLocal2 from '../../components/Contrato/DetalhesLocal2';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { api } from './../../api';
import Swal from 'sweetalert2';

const ContratoDetalhes = () => {

    const { idContrato } = useParams();

    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState()

    useEffect(() => {
        fetchContrato();
    }, []);

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contrato/${idContrato}`);
            setLocalData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    const contratoData = {
        status: "ABERTO"
    };

    const saveData = async () => {
        try {
            setLoading(true);
            const id = localData.id;

            const response = await api.post(`/contrato/update/${id}`, contratoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            console.log(contratoData)

        } catch (error) {
            console.error(error);
            console.log(contratoData)
            const errorText = "Ocorreu um erro ao salvar os dados do contrato.";
            Swal.fire({
                icon: "error",
                title: "Erro ao salvar contrato",
                text: errorText
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='containerContrato'>
            <div className="contrato">
                <div className="content">
                    <DetalhesLocal2
                        localData={localData}
                    />
                </div>
            </div>
            <button onClick={saveData} disabled={loading}>
                {loading ? <Loading /> : 'Salvar'}
            </button>
            <div style={{ marginTop: '20px' }}>
                <a href="/locais" className='exitPassword'>Voltar aos Locais</a>
            </div>
        </div>
    );
}

export default ContratoDetalhes;