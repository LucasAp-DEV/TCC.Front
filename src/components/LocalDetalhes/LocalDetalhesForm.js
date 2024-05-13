import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LocalDetalhesForm.css'

function LocalDetalhesForm({ localData }) {

    const [sliderIndex, setSliderIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: index => setSliderIndex(index),
    };

    return (
        <div className="container">
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
            <h1>Detalhes Local</h1>
            <p className="info descricao">Descrição: {localData?.descricao}</p>
            <p className="info">Valor: R$ {localData?.price}</p>
            <p className="info">Cidade: {localData?.cidade}</p>
            <p className="info">Endereço: {localData?.endereco}</p>
            <p className="info">Locatario: {localData?.locatarioName}</p>
            <p className="info">Telefone: {localData?.locatarioTell}</p>
            <div>
                <h1>Feedback</h1>
                {localData?.feedback.map((feedback, index) => (
                    <div key={index} className="feedback">
                        <p style={{ fontWeight: "bold" }}>Locador: <span>{feedback.nome}</span></p>
                        <p style={{ fontWeight: "bold" }}>{feedback.descricao}</p>
                        <p style={{ fontWeight: "bold" }}>Nota: <span>{feedback.nota}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LocalDetalhesForm;
