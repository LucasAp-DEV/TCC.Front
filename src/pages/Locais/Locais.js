import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import LoadingTela from '../../components/Loading/LoadingTela';
import Swal from 'sweetalert2';
import Select from 'react-select';
import './Locais.css';

const Locais = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityFilter, setCityFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState('');

    const fetchApiData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/local/list');
            setApiData(data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar dados!',
                text: 'Ocorreu um erro ao carregar os dados dos locais.',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchFilteredApiData = async (filterData) => {
        const { city, date } = filterData;
        setLoading(true);
        try {
            const { data } = await api.get('/local/filter', {
                params: { city, date }
            });
            setApiData(data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar dados!',
                text: 'Ocorreu um erro ao carregar os dados dos locais.',
            });
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchApiData();
    }, [fetchApiData]);

    const handleCityChange = (selectedOption) => {
        setCityFilter(selectedOption);
    };

    const renderCityOptions = () => {
        const uniqueCities = [...new Set(apiData.map(item => item.cidade))];
        return uniqueCities.map(city => ({ value: city, label: city }));
    };

    const handleFilterSubmit = async () => {
        if (!cityFilter) {
            Swal.fire({
                icon: 'error',
                title: 'Selecione uma cidade!',
                text: 'É necessário escolher uma cidade antes de aplicar o filtro.',
            });
            return;
        }
    
        if (!dateFilter) {
            Swal.fire({
                icon: 'error',
                title: 'Escolha uma data!',
                text: 'É necessário escolher uma data antes de aplicar o filtro.',
            });
            return;
        }
    
        const city = cityFilter.value;
        const date = dateFilter;
        const filterData = { city, date };
        try {
            await fetchFilteredApiData(filterData);
            console.log(filterData)
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao filtrar dados!',
                text: 'Ocorreu um erro ao filtrar os dados dos locais.',
            });
        }
    };
    
    

    const renderApiData = () => {
        if (loading && !apiData.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-data">
                <div className="filter-container">
                    <div className="form-group">
                        <Select
                            value={cityFilter}
                            onChange={handleCityChange}
                            options={renderCityOptions()}
                            placeholder="Selecione a cidade.."
                            maxMenuHeight={100}
                            className="form-select"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            required
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="filter-button" onClick={handleFilterSubmit}>Pesquisar</button>
                    </div>
                </div>

                {apiData.map(api => (
                    <div className="api-info1" key={api.id}>
                        {api.images.length > 0 &&
                            <img src={`data:image/png;base64,${api.images[0]}`} alt="Imagem do Local" />
                        }
                        <div className="info-column">
                            <h5>Preço: R$ {api.price}</h5>
                            <h5>Proprietario: {api.locatarioName}</h5>
                            <h5>Endereço: {truncateEdereco(api.endereco)}</h5>
                            <h5>Cidade: {api.cidade}</h5>
                        </div>
                        <div className='button-container'>
                            <Link to={{ pathname: `/localDetalhes/${api.id}` }}>
                                <button>
                                    Detalhes
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    function truncateEdereco(description, maxLength = 20) {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    }

    return (
        <div>
            {renderApiData()}
        </div>
    );
}

export default Locais;
