import React, { useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';
import './UpdateLocais.css';
import HighlightModal from '../../components/Modais/HighlightModal';
import QRCodeModal from '../../components/Modais/QRCodeModal';
import EditModal from '../../components/Modais/EditModal';

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
        speed: 900,
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
            id: idLocal
        };
        try {
            const response = await api.post('/api/payments/create', DataPix);
            setQRCodeData(response);
            console.log(response)
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
                    <div className="slider">
                        <Slider {...settings} initialSlide={sliderIndex}>
                            {localData?.images.map((image, index) => (
                                <div key={index}>
                                    <img src={`data:image/png;base64,${image}`} 
                                    alt="Imagem"
                                    style={{
                                        objectFit: 'cover',
                                        height: '350px', 
                                        maxWidth: '850px'
                                        }}
                                    />
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

    return (
        <div>
            {renderApi()}
            {showEditModal && (
                <EditModal 
                    setShowEditModal={setShowEditModal} 
                    editedDescription={editedDescription}
                    setEditedDescription={setEditedDescription}
                    editedValue={editedValue}
                    setEditedValue={setEditedValue}
                    handleSaveChanges={handleSaveChanges}
                    saving={saving}
                />
            )}
            {showHighlightModal && <HighlightModal setShowHighlightModal={setShowHighlightModal} handlePayment={handlePayment} />}
            {showQRCodeModal && <QRCodeModal qrCodeData={qrCodeData} setShowQRCodeModal={setShowQRCodeModal} />}
        </div>
    );
};

export default UpdateLocais;
