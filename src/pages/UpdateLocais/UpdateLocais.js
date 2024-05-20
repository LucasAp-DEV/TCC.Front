import React, { useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../../components/Loading/Loading';
import './UpdateLocais.css';
import Swal from 'sweetalert2';
import axios from 'axios'; // Para chamadas à API do Mercado Pago

const UpdateLocais = () => {
    const { idLocal } = useParams();

    const [localData, setLocalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showHighlightModal, setShowHighlightModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedValue, setEditedValue] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [cpf, setCpf] = useState('');
    const [qrCode, setQrCode] = useState('');

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: index => setSliderIndex(index),
    };

    useEffect(() => {
        fetchContrato();
    }, []);

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/${idLocal}`);
            setLocalData(data);
            setEditedDescription(data.descricao);
            setEditedValue(data.price);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = () => {
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const openHighlightModal = () => {
        setShowHighlightModal(true);
    };

    const closeHighlightModal = () => {
        setShowHighlightModal(false);
    };

    const openPaymentModal = () => {
        setShowPaymentModal(true);
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value);
    };

    const handleValueChange = (event) => {
        setEditedValue(Number(event.target.value));
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        closeEditModal();
        try {
            const newEditData = {
                descricao: editedDescription,
                price: editedValue
            };

            await api.put(`/local/update/${idLocal}`, newEditData);

            setLocalData(prevData => ({
                ...prevData,
                descricao: editedDescription,
                price: editedValue
            }));

            Swal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: 'O cadastro do local foi atualizado.'
            });

            fetchContrato();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar atualizar o local.'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleHighlight = async () => {
        setSaving(true);
        closeHighlightModal();
        try {
            // Chamar a API do Mercado Pago para gerar um pagamento PIX
            const response = await axios.post('/mercado-pago/pix', {
                transaction_amount: 10,
                description: 'Pagamento para destacar local',
                payment_method_id: 'pix',
                payer: {
                    email: 'email@example.com',
                    identification: {
                        type: 'CPF',
                        number: cpf,
                    },
                },
            });

            const { qr_code_base64 } = response.data.point_of_interaction.transaction_data;
            setQrCode(qr_code_base64);
            openPaymentModal();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao gerar pagamento PIX!',
                text: 'Ocorreu um erro ao tentar gerar o pagamento via PIX.'
            });
        } finally {
            setSaving(false);
        }
    };

    const renderApi = () => {
        if (loading || saving) {
            return <LoadingTela />;
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <div className="container">
                    <h1>Imagens</h1>
                    <div className="slider">
                        <Slider {...settings} initialSlide={sliderIndex}>
                            {localData?.images.map((image, index) => (
                                <div key={index}>
                                    <img src={`data:image/png;base64,${image}`} alt="Imagem" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div>
                        <h1>Detalhes Local</h1>
                        <p className="info descricao">Descrição: {localData?.descricao}</p>
                        <p className="info">Valor: R$ {localData?.price},00</p>
                        <p className="info">Cidade: {localData?.cidade}</p>
                        <p className="info">Endereço: {localData?.endereco}</p>
                        <p className="info">Locatário: {localData?.locatarioName}</p>
                        <p className="info">Telefone: {localData?.locatarioTell}</p>
                    </div>
                    <div>
                        <button onClick={openEditModal} type="button">
                            Editar
                        </button>
                        <button onClick={openHighlightModal} type="button">
                            Destacar Local
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderApi()}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h1>Editar Local</h1>
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            required
                            type="text"
                            id="description"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                            className="textarea"
                            rows={5}
                        />
                        <p></p>
                        <label htmlFor="value">Valor:</label>
                        <input
                            required
                            type="number"
                            id="value"
                            value={editedValue}
                            onChange={handleValueChange}
                            className="input"
                        />
                        <div>
                            <button onClick={handleSaveChanges} disabled={saving}>
                                {saving ? <Loading /> : 'Salvar Alterações'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showHighlightModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeHighlightModal}>&times;</span>
                        <h1>Destacar Local</h1>
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            required
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={handleCpfChange}
                            className="input"
                        />
                        <div>
                            <button onClick={handleHighlight}>
                                Destacar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPaymentModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closePaymentModal}>&times;</span>
                        <h1>Pagamento via PIX</h1>
                        {qrCode ? (
                            <div>
                                <img src={`data:image/png;base64,${qrCode}`} alt="QR Code PIX" />
                                <p>Escaneie o QR Code acima para realizar o pagamento.</p>
                            </div>
                        ) : (
                            <p>Gerando QR Code...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateLocais;
