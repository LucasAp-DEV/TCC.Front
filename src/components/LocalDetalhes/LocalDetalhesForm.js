import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LocalDetalhesForm({ localData }) {
    const [sliderIndex, setSliderIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        afterChange: index => setSliderIndex(index)
    };

    const handlePrevSlide = () => {
        setSliderIndex(prevIndex => prevIndex - 1);
    };

    const handleNextSlide = () => {
        setSliderIndex(prevIndex => prevIndex + 1);
    };

    return (
        <div>
            <div>
                <p>teste</p>
                <p>teste</p>
                <div style={{ height: '400px' }}>
                    <Slider {...settings} initialSlide={sliderIndex}>
                        {localData?.images.map((image, index) => (
                            <div key={index} style={{ height: '100%' }}>
                                <img src={`data:image/png;base64,${image}`} alt={"Imagem"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div>
                    <button onClick={handlePrevSlide} disabled={sliderIndex === 0}>Anterior</button>
                    <button onClick={handleNextSlide} disabled={sliderIndex === localData?.images.length - 1}>Próxima</button>
                </div>
                <p>Telefone: {localData?.locatarioTell}</p>
                <p>Cidade: {localData?.cidade}</p>
                <p>Locatario: {localData?.locatarioName}</p>
                <p>Valor: R$ {localData?.price}</p>
                <p>Descrição: {localData?.descricao}</p>
                <p>Endereço: {localData?.endereco}</p>
                <div>
                    {localData?.feedback.map((feedback, index) => (
                        <div key={index}>
                            <p>Feedback: {feedback.descricao}</p>
                            <p>Nota: <span>{feedback.nota}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LocalDetalhesForm;
