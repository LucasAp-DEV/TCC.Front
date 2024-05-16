import React, { useEffect, useState } from 'react';
import LoadingTela from '../../components/Loading/LoadingTela';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../../components/Loading/Loading';
import './UpdateLocais.css';

const UpdateLocais = () => {
    
    const { idLocal } = useParams();

    const [localData, setLocalData] = useState();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            setLocalData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const openModal = () => {
        setShowModal(true);
        setEditedDescription(localData?.descricao);
        setEditedValue(localData?.price);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value);
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const handleSaveChanges = async () => {
        try {
            // Aqui você faria a chamada para a API para atualizar os dados no servidor
            // Por simplicidade, vamos apenas atualizar o estado localmente
            setLocalData(prevData => ({
                ...prevData,
                descricao: editedDescription,
                price: editedValue
            }));
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const renderApi = () => {
        if (loading === true) {
            return <LoadingTela />;
        }
        return (
            <div style={{ backgroundColor: "yellow" }}>
                <h1>Imagens</h1>
                <h1>Imagens</h1>
                <div className="slider">
                    <Slider {...settings} initialSlide={sliderIndex}>
                        {localData?.images.map((image) => (
                            <div>
                                <img src={`data:image/png;base64,${image}`} alt={"Imagem"} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div>
                    <h1>Detalhes Local</h1>
                    <p >Descrição: {localData?.descricao}</p>
                    <p >Valor: R$ {localData?.price},00</p>
                    <p >Cidade: {localData?.cidade}</p>
                    <p>Endereço: {localData?.endereco}</p>
                    <p >Locatario: {localData?.locatarioName}</p>
                    <p >Telefone: {localData?.locatarioTell}</p>
                </div>
                <div>
                    <button onClick={openModal} type='button' disabled={loading}>
                        {loading ? <Loading /> : 'Editar'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderApi()}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Editar Local</h2>
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            type="text"
                            id="description"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                boxSizing: 'border-box',
                                textAlign: 'left',
                                resize: 'none',
                                fontFamily: 'Arial, sans-serif',
                                fontSize:'15px'
                            }}
                            rows={5}
                        />

                        <p></p>
                        <label htmlFor="value">Valor:</label>
                        <input
                            type="number"
                            id="value"
                            value={editedValue}
                            onChange={handleValueChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                boxSizing: 'border-box',
                                textAlign: 'left',
                                resize: 'none',
                                fontFamily: 'Arial, sans-serif',
                                fontSize:'15px'
                            }}
                        />
                        <div>
                            <button onClick={handleSaveChanges}>Salvar Alterações</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default UpdateLocais;
