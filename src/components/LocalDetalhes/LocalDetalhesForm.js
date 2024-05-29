import React, { useState } from 'react';
import Slider from 'react-slick';
import './LocalDetalhesForm.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LocalDetalhesForm({ localData }) {

    const [sliderIndex, setSliderIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: index => setSliderIndex(index),
    };

    return (
        <div className="container">
            <div className="slider">
                <Slider {...settings} initialSlide={sliderIndex}>
                    {localData?.images.map((image) => (
                        <div>
                            <img src={`data:image/png;base64,${image}`} alt={"Imagem"}
                                style={{
                                    objectFit: 'cover',
                                    height: '350px',
                                    maxWidth: '850px'
                                }} />
                        </div>
                    ))}
                </Slider>
            </div>
            <h1>Detalhes Local</h1>
            <p className="info descricao">Descrição: {localData?.descricao}</p>
            <p className="info">Valor: R$ {localData?.price},00</p>
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
                        <span style={{
                            backgroundColor: feedback.nota < 5 ? 'red' : feedback.nota < 7 ? 'yellow' : 'green',
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            padding: '9px',
                            borderRadius: '3px',
                            fontFamily: 'Arial',
                            display: 'inline-block',
                            marginTop: '5px'
                        }}>
                            Nota: {feedback.nota}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LocalDetalhesForm;
