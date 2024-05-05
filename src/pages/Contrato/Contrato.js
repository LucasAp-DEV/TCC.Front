import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import './Contrato.css';
import { useNavigate, useParams } from 'react-router-dom';
import DetalhesContrato from '../../components/Contrato/DetalhesContrato';
import { api } from '../../api';
import Loading from '../../components/Loading/Loading';

const Contrato = () => {
    const navigate = useNavigate();

    const { idLocal } = useParams();
    
    const [localData, setLocalData] = useState();
    const [dataAluguel, setDataAluguel] = useState();
    const [IdLocador, setIdLocador] = useState();
    const [IdLocatario, setLocatario] = useState();
    const [localId, setLocalid] = useState();
    const [loading, setLoading] = useState(false);
    const [nomeLocador, setNomeLocador] = useState("")

    useEffect(() => {
        fetchContrato();
        fetchStorage()
    }, []);

    const fetchStorage = () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setIdLocador(decodedToken.Id);
        setNomeLocador(decodedToken.Name);
    }

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/${idLocal}`);
            setLocatario(data.locatarioId)
            setLocalid(data.id)
            setLocalData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


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
            setLoading(true);

            if (!dataAluguel) {
                const errorText = "É necessario inserir uma data";
                Swal.fire({
                    icon: "error",
                    title: "Erro ao salvar contrato",
                    text: errorText
                });
                return;
            }

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
                status: "ABERTO"
            };

            const response = await api.post('/contrato/register', contratoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            navigate('/contratolist');

        } catch (error) {
            console.error(error);
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
                    <DetalhesContrato
                        localData={localData}
                        nomeLocador={nomeLocador}
                        dataAluguel={dataAluguel}
                        handleDataAluguelChange={handleDataAluguelChange}
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

export default Contrato;
