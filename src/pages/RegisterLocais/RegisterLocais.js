import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import RegisterLocaisForm from './../../components/RegisterFromLocais/RegisterLocaisForm';
import { jwtDecode } from 'jwt-decode';
import './RegisterLocais.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const RegisterLocais = () => {

  const navigate = useNavigate()

  const [endereco, setEndereco] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [cidade, setCidade] = useState();
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [locatario, setLocatario] = useState();
  const [loading, setRemoveLoading] = useState(false);

  useEffect(() => {
    fetchCidadesOptions();
    fetchStorage()
  }, []);

  const fetchStorage = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    setLocatario(decodedToken.Id);
  }

  const fetchCidadesOptions = async () => {
    try {
      const response = await api.get('/cidade/list');
      const cidadesData = response.data;
      const options = cidadesData.map((cidade) => ({
        id: cidade.id,
        name: cidade.name,
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

  const onChangeCidade = (selectedOption) => {
    setCidade(selectedOption);
  };

  function showErrorAlert(message) {
    Swal.fire({
      icon: "error",
      title: "Erro ao Cadastrar",
      text: message
    });
  }

  function showSucessAlert(message) {
    Swal.fire({
      icon: "success",
      title: "Cadastro Realizado",
      text: message
    });
  }

  const onChangeImage = (event) => {
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
      setBase64Images(base64Array);
    });
  };

  const onSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
  
    const localData = {
      descricao: descricao,
      price: valor,
      endereco: endereco,
      status: 'NORMAL',
      cidade: {
        id: cidade
      },
      locatario: {
        id: locatario
      }
    };
  
    try {
      setRemoveLoading(true)
      const response = await api.post('/local/register', localData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const localId = response.data;
  
      const imageData = { images: base64Images, localId: localId };
      const response2 = await api.post('/images/register', imageData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response2);
      showSucessAlert("Cadastro realizado");
      navigate("/usuarios")
    } catch (error) {
      console.error(error);
      showErrorAlert("Erro ao Registrar");
    } finally {
      setRemoveLoading(false);
    }
  };
  

  return (
    <div className='registerLocal'>
      <div className='registerForm'>
        <RegisterLocaisForm
          onSubmit={onSubmit}
          endereco={endereco}
          descricao={descricao}
          valor={valor}
          images={images}
          onChangeEndereco={onChangeEndereco}
          onChangeDescricao={onChangeDescricao}
          onChangeValor={onChangeValor}
          onChangeCidade={onChangeCidade}
          onChangeImage={onChangeImage}
          cidadesOptions={cidadesOptions}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RegisterLocais;