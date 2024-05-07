import React, { useEffect, useState } from 'react';
import DetalhesLocal2 from '../../components/Contrato/DetalhesLocal2';
import { useParams } from 'react-router-dom';
import { api } from './../../api';
import Swal from 'sweetalert2';
import './ContratoDetalhes.css';
import { jwtDecode } from 'jwt-decode';
import LoadingTela from '../../components/Loading/LoadingTela';

const ContratoDetalhes = () => {

    const { idContrato } = useParams();

    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState();
    const [typeUser, setTypeUser] = useState(false)

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const Usertype = decodedToken.Id

    useEffect(() => {
        fetchContrato();
    }, []);


    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contrato/${idContrato}`);
            setLocalData(data)
            if(data.locatarioId === Usertype){
                setTypeUser(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
            const statusData = { status: localData.status }
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

    const renderData = () => {
        if (loading === true) {
            return <LoadingTela />;
        }
        return (
            <div>
                <div className='container1'>
                    <div className='container2'>
                        <div className='container3'>
                            <DetalhesLocal2
                                localData={localData}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {typeUser && <div className='container4'>
                        <button onClick={saveData} className='buttonVoltar'> Salvar </button>
                        <button onClick={handleEditStatus} className='buttonSalvar'> Editar status </button>
                    </div>}
                    <div style={{ marginTop: '20px' }}>
                        <a href="/contratolist" className='exitPassword'>Voltar aos Contratos</a>
                    </div>
                </div>
            </div>
        );
    }

    
    return (
        <div>F
            {renderData()}
        </div>
    );
}

export default ContratoDetalhes;