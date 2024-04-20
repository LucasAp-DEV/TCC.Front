import React, { useState } from 'react';
import { api } from '../../api';
import RegisterLocaisForm from './../../components/RegisterFromLocais/RegisterLocaisForm';

const RegisterLocais = () => {
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [localId, setLocalId] = useState(1);

  const onChangeImage = (event) => {
    console.log('onChangeImage foi chamado');
    const files = event.target.files;
    const imagesArray = Array.from(files);

    setImages(imagesArray);

    Promise.all(
      imagesArray.map((image) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      })
    ).then((base64Array) => {
      console.log('Base64 array:', base64Array);
      setBase64Images(base64Array);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = { images: base64Images[0], localId };

    console.log(formData)

    try {
      const response = await api.post('/images/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao enviar imagens:', error);
    }
  };

  return (
    <div>
      <RegisterLocaisForm
        onSubmit={onSubmit}
        onChangeImage={onChangeImage}
        images={images}
      />
    </div>
  );
};

export default RegisterLocais;
