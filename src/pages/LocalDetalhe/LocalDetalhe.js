import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import LocalDetalhesForm from '../../components/LocalDetalhes/LocalDetalhesForm';
import './LocalDetalhe.css'


function LocalDetalhe() {
  
  const { idLocal } = useParams();

  const navigate = useNavigate();

  const [localData, setLocalData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContrato();
  }, []);

  const fetchContrato = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/local/${idLocal}`);
      setLocalData(data)
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const renderApi = () => {
    if (loading === true) {
      return <LoadingTela />;
    }
    return (
      <div className="centralizado">
        <div className="centralizado1">
          <LocalDetalhesForm
            localData={localData}
          />
          <div className="botoes">
            <Link to={{ pathname: `/contrato/${localData?.id}` }}>
              <button>Contratar</button>
            </Link>
            <button onClick={() => { navigate('/locais') }}
              alt='Locais' title='Locais'>
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      {renderApi()}
    </div>
  )
}

export default LocalDetalhe;
