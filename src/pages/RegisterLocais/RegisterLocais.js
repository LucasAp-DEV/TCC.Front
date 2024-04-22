import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import RegisterLocaisForm from './../../components/RegisterFromLocais/RegisterLocaisForm';

const RegisterLocais = () => {
  const [localId, setLocalId] = useState();
  const [endereco, setEndereco] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [cidade, setCidade] = useState();
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCidadesOptions();
  }, []);

  const fetchCidadesOptions = async () => {
    try {
      const response = await api.get('/cidade/list');
      const cidadesData = response.data;
      const options = cidadesData.map((cidade) => ({
        value: cidade.id,
        label: cidade.name,
      }));
      setCidadesOptions(options);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const onChangeEndereco = (event) => {
    setEndereco(event.target.value);
  };

  const onChangeDescricao = (event) => {
    setDescricao(event.target.value);
  };

  const onChangeValor = (event) => {
    setValor(event.target.value);
  };

  const onChangeCidade = (event) => {
    setCidade(event.target.value);
  };

  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCidadesOptions = cidadesOptions.filter((cidade) =>
    cidade.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    const localData = { endereco, descricao, valor, cidade };
    const imageData = { images: base64Images[0], localId };

    try {
      const response2 = await api.post('/locais/register', localData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response2.data);


      const response = await api.post('/images/register', imageData, {
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
        endereco={endereco}
        descricao={descricao}
        valor={valor}
        cidade={cidade}
        images={images}
        searchTerm={searchTerm}
        onChangeEndereco={onChangeEndereco}
        onChangeDescricao={onChangeDescricao}
        onChangeValor={onChangeValor}
        onChangeCidade={onChangeCidade}
        onChangeImage={onChangeImage}
        onChangeSearchTerm={onChangeSearchTerm}
        cidadesOptions={filteredCidadesOptions}
      />
    </div>
  );
};

export default RegisterLocais;
