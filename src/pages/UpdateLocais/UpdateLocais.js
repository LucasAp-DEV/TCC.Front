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
import axios from 'axios';

const UpdateLocais = () => {
    const { idLocal } = useParams();

    const [localData, setLocalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showHighlightModal, setShowHighlightModal] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedValue, setEditedValue] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);

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

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value);
    };

    const handleValueChange = (event) => {
        setEditedValue(Number(event.target.value));
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

    const handlePayment = async () => {
        setSaving(true);
        closeHighlightModal();
        try {
            const response = await axios.post(
             
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
                            <h1>Termos de Destaque de Local</h1>
                        <p>Por favor, leia atentamente os seguintes termos antes de destacar um local:</p>
                        <p>- Ao destacar um local, você concorda em pagar a taxa correspondente.</p>
                        <p>- O destaque do local está sujeito à disponibilidade e aceitação.</p>
                        <p>- Uma vez destacado, o local será promovido com destaque em nossa plataforma.</p>
                        <p>- Ao clicar em "Destacar", você concorda com os termos acima.</p>
                        <div>
                            <button onClick={handlePayment}>
                                Destacar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateLocais;
