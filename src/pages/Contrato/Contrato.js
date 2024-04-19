import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useLocal } from '../../LocalContext';
import Swal from 'sweetalert2';
import './Contrato.css';
import { useNavigate } from 'react-router-dom';
import DetalhesContrato from '../../components/Contrato/DetalhesContrato';
import { api } from '../../api';
import Loading from '../../components/Loading/Loading';

const Contrato = () => {
    const navigate = useNavigate()
    const { localData } = useLocal();
    const [dataAluguel, setDataAluguel] = useState();
    const [IdLocador, setIdLocador] = useState();
    const [IdLocatario, setLocatario] = useState();
    const [localId, setLocalid] = useState();
    const [status, setStatus] = useState("ABERTO");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (localData) {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            setIdLocador(decodedToken.Id);
            setLocatario(localData.locatarioId);
            setLocalid(localData.id)
        }
    }, [localData]);

    const handleDataAluguelChange = (event) => {
        const newData = event.target.value;
        setDataAluguel(newData);
        const dataAtual = new Date();
        const dataSelecionada = new Date(newData);
        if (dataSelecionada <= dataAtual) {
            showError("A data precisa ser maior que a data atual.");
            setDataAluguel('');
        }
    };

    const showError = (errorText) => {
        Swal.fire({
            icon: "error",
            title: "Erro no Cadastro",
            text: errorText
        });
    };

    const saveData = async () => {
        try {
            setSaving(true);

            if (!dataAluguel) {
                const errorText = "É necessario inserir uma data";
                Swal.fire({
                    icon: "error",
                    title: "Erro ao salvar contrato",
                    text: errorText
                });
                setSaving(false);
                return;
            }

            setTimeout(async () => {
                const contratoData = {
                    descricao: localData.descricao,
                    data: dataAluguel,
                    locatario: {
                        id: IdLocatario
                    },
                    local: {
                        id: localId
                    },
                    locador: {
                        id: IdLocador
                    },
                    status: status
                };

                const response = await api.post('/contrato/register', contratoData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);
                setSaving(false);
                navigate('/locais');
            }, 2000);

        } catch (error) {
            console.error(error);
            const errorText = "Ocorreu um erro ao salvar os dados do contrato.";
            Swal.fire({
                icon: "error",
                title: "Erro ao salvar contrato",
                text: errorText
            });
            setSaving(false);
        }
    };


    if (!localData) {
        return navigate('/locais');
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const nomeLocador = decodedToken.Name;

    return (
        <div className='containerContrato'>
            <div className="contrato">
                <div className="content">
                    <DetalhesContrato
                        localData={localData}
                        nomeLocador={nomeLocador}
                        dataAluguel={dataAluguel}
                        handleDataAluguelChange={handleDataAluguelChange}
                    />
                </div>
            </div>
            <button onClick={saveData} disabled={saving}>
                {saving ? <Loading /> : 'Salvar'}
            </button>
            <div style={{ marginTop: '20px' }}>
                <a href="/locais" className='exitPassword'>Voltar aos Locais</a>
            </div>
        </div>
    );

}

export default Contrato;
