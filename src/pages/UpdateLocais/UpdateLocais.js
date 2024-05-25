import React, { useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';
import './UpdateLocais.css';
import { FaCopy } from 'react-icons/fa';

const UpdateLocais = () => {
    const { idLocal } = useParams();

    const [localData, setLocalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showHighlightModal, setShowHighlightModal] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedValue, setEditedValue] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [qrCodeData, setQRCodeData] = useState(null);

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
    }, [idLocal]);

    const fetchContrato = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/${idLocal}`);
            setLocalData(data);
            setEditedDescription(data.descricao);
            setEditedValue(data.price);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar dados!',
                text: 'Ocorreu um erro ao carregar os dados do local.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        setShowEditModal(false);
        try {
            const newEditData = {
                descricao: editedDescription,
                price: editedValue,
            };

            await api.put(`/local/update/${idLocal}`, newEditData);

            setLocalData(prevData => ({
                ...prevData,
                descricao: editedDescription,
                price: editedValue,
            }));

            Swal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: 'O cadastro do local foi atualizado.',
            });

            fetchContrato();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar atualizar o local.',
            });
        } finally {
            setSaving(false);
        }
    };

    const handlePayment = async () => {
        setSaving(true);
        setShowHighlightModal(false);
        const DataPix = {
            email: "Lucas@gmail.com",
        };
        try {
            const response = await api.post('/api/payments/create', DataPix);
            setQRCodeData(response.data.transaction_data);
            Swal.fire({
                icon: 'success',
                title: 'Pagamento gerado!',
                text: 'O pagamento via PIX foi gerado com sucesso.',
            });
            setShowQRCodeModal(true);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao gerar pagamento PIX!',
                text: 'Ocorreu um erro ao tentar gerar o pagamento via PIX.',
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
            <div className="content-wrapper">
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
                    <div className="button-group">
                        <button onClick={() => setShowEditModal(true)} type="button">
                            Editar
                        </button>
                        <button onClick={() => setShowHighlightModal(true)} type="button">
                            Destacar Local
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const EditModal = () => (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                <h1>Editar Local</h1>
                <label htmlFor="description">Descrição:</label>
                <textarea
                    required
                    id="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="textarea"
                    rows={5}
                />
                <label htmlFor="value">Valor:</label>
                <input
                    required
                    type="number"
                    id="value"
                    value={editedValue}
                    onChange={(e) => setEditedValue(Number(e.target.value))}
                    className="input"
                />
                <button onClick={handleSaveChanges} disabled={saving}>
                    {saving ? <LoadingTela /> : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );

    const HighlightModal = () => (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowHighlightModal(false)}>&times;</span>
                <h1>Termos de Destaque de Local</h1>
                <p>Por favor, leia atentamente os seguintes termos antes de destacar um local:</p>
                <p>- Ao destacar um local, você concorda em pagar a taxa correspondente.</p>
                <p>- O destaque do local está sujeito à disponibilidade e aceitação.</p>
                <p>- Uma vez destacado, o local será promovido com destaque em nossa plataforma.</p>
                <p>- Ao clicar em "Destacar", você concorda com os termos acima.</p>
                <button onClick={handlePayment}>Destacar</button>
            </div>
        </div>
    );

    const QRCodeModal = () => (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowQRCodeModal(false)}>&times;</span>
                <h1>QR Code para Pagamento</h1>
                {qrCodeData && (
                    <>
                        <img src={`data:image/png;base64,${qrCodeData.qr_code_base64}`} alt="QR Code" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ marginRight: '10px' }}>Código QR: {qrCodeData.qr_code}</p>
                            <FaCopy
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigator.clipboard.writeText(qrCodeData.qr_code)} 
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
    

    return (
        <div>
            {renderApi()}
            {showEditModal && <EditModal />}
            {showHighlightModal && <HighlightModal />}
            {showQRCodeModal && <QRCodeModal />}
        </div>
    );
};

export default UpdateLocais;
