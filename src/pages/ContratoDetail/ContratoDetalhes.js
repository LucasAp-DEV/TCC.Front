import React, { useEffect, useState } from 'react';
import DetalhesLocal2 from '../../components/Contrato/DetalhesLocal2';
import { useParams } from 'react-router-dom';
import { api } from './../../api';
import Swal from 'sweetalert2';
import './ContratoDetalhes.css';
import { jwtDecode } from 'jwt-decode';
import LoadingTela from '../../components/Loading/LoadingTela';
import Loading from '../../components/Loading/Loading';

const ContratoDetalhes = () => {

    const { idContrato } = useParams();

    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState();
    const [typeUser, setTypeUser] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [nota, setNota] = useState(0);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const Usertype = decodedToken.Id;

    useEffect(() => {
        fetchContrato();
    }, []);

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contrato/${idContrato}`);
            setLocalData(data);
            if (data.locatarioId === Usertype) {
                setTypeUser(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditStatus = async () => {
        const roleOptions = {
            ABERTO: 'ABERTO',
            ENCERRADO: 'ENCERRADO'
        };

        const { value: selectedStatus } = await Swal.fire({
            title: 'Editar Status',
            input: 'select',
            inputOptions: roleOptions,
            inputPlaceholder: 'Selecione o Status',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== '') {
                        resolve();
                    } else {
                        resolve('Você precisa selecionar um status.');
                    }
                });
            }
        });

        if (selectedStatus) {
            const newEditData = { ...localData, status: selectedStatus };
            setLocalData(newEditData);
        }
    };

    const saveData = async () => {
        try {
            setLoading(true);
            const id = localData.id;
            const statusData = { status: localData.status };
            await api.put(`/contrato/update/${id}`, statusData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: 'O cadastro do usuário foi atualizado.'
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Erro ao salvar contrato",
                text: "Ocorreu um erro ao salvar os dados do contrato."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveFeedback = async () => {
        setSaving(true);
        closeModal();
        try {
            const idContrato = localData.local;
            const feedbackData = {
                descricao,
                nota,
                contrato: {
                    id: idContrato
                }
            };

            console.log(feedbackData)

            await api.post(`/feedback/register`, feedbackData);

            Swal.fire({
                icon: 'success',
                title: 'Feedback salvo com sucesso!',
                text: 'Seu feedback foi registrado.'
            });

            fetchContrato();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar feedback!',
                text: 'Ocorreu um erro ao tentar salvar seu feedback.'
            });
        } finally {
            setSaving(false);
        }
    };

    const renderData = () => {
        if (loading === true) {
            return <LoadingTela />;
        }
        return (
            <div>
                <div className='container1'>
                    <div className='container2'>
                        <div className='container3'>
                            <DetalhesLocal2 localData={localData} />
                        </div>
                    </div>
                </div>
                <div>
                    {typeUser && (
                        <div className='container4'>
                            <button onClick={saveData} className='buttonVoltar'>Salvar</button>
                            <button onClick={handleEditStatus} className='buttonSalvar'>Editar status</button>
                        </div>
                    )}
                    {!typeUser && localData?.status === 'ENCERRADO' && (
                        <div className='container4'>
                            <button onClick={openModal} className='buttonVoltar'>Feedback</button>
                        </div>
                    )}

                    <div style={{ marginTop: '20px' }}>
                        <a href="/contratolist" className='exitPassword'>Voltar aos Contratos</a>
                    </div>
                </div>
            </div>
        );
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleRatingChange = (event) => {
        setNota(Number(event.target.value));
    };

    return (
        <div>
            {renderData()}
            {showModal && !saving && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h1> Adicionar Feedback </h1>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                            required
                            id="descricao"
                            value={descricao}
                            onChange={handleDescricaoChange}
                            className="textarea"
                            rows={5}
                        />
                        <label htmlFor="rating">Nota:</label>
                        <input
                            required
                            type="number"
                            id="rating"
                            value={nota}
                            onChange={handleRatingChange}
                            className="input"
                            min="0"
                            max="10"
                        />
                        <div>
                            <button onClick={handleSaveFeedback} disabled={saving}>
                                {saving ? <Loading /> : 'Salvar Feedback'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContratoDetalhes;
