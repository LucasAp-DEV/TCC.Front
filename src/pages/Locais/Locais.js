import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import LoadingTela from '../../components/Loading/LoadingTela';
import Swal from 'sweetalert2';
import Select from 'react-select';
import './Locais.css';

const Locais = () => {
    const [apiData, setApiData] = useState([]);
    const [originalApiData, setOriginalApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityFilter, setCityFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState('');

    const fetchApiData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/local/list');

            const filteredData = data.filter(item => item.disponibilidade === true);

            const sortedData = filteredData.sort((a, b) => {
                if (a.status === 'PATROCINADO' && b.status !== 'PATROCINADO') return -1;
                if (a.status !== 'PATROCINADO' && b.status === 'PATROCINADO') return 1;
                return 0;
            });

            setApiData(sortedData);
            setOriginalApiData(sortedData);
            console.log(sortedData);
            if (sortedData.length === 0) {
                Swal.fire({
                    title: 'Não possui locais cadastrados.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
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

    const fetchApiDataFilter = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/local/filter?data=${dateFilter}`);

            const filteredData = data.filter(item => item.disponibilidade === true);

            const sortedData = filteredData.sort((a, b) => {
                if (a.status === 'PATROCINADO' && b.status !== 'PATROCINADO') return -1;
                if (a.status !== 'PATROCINADO' && b.status === 'PATROCINADO') return 1;
                return 0;
            });

            setApiData(sortedData);
            setOriginalApiData(sortedData);
            console.log(sortedData);
            if (sortedData.length === 0) {
                Swal.fire({
                    title: 'Não possui locais cadastrados.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
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
    }, [dateFilter]);



    useEffect(() => {
        fetchApiData();
    }, [fetchApiData]);

    const handleCityChange = (selectedOption) => {
        setCityFilter(selectedOption);

        const filteredData = originalApiData.filter(local => local.cidade === selectedOption.label);
        setApiData(filteredData);
    };

    const handleDateChange = (e) => {
        setDateFilter(e.target.value);
    };

    const renderCityOptions = () => {
        const uniqueCities = Array.from(
            new Map(originalApiData.map(item => [item.cidade, item])).values()
        );
        return uniqueCities.map(city => ({ value: city.cidadeId, label: city.cidade }));
    };

    const renderApiData = () => {
        if (loading && !apiData.length) {
            return <LoadingTela />;
        }
        return (
            <div className="api-data">
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
                    <input
                        placeholder='Data disponivel'
                        type='date'
                        value={dateFilter}
                        onChange={handleDateChange}
                        className="form-date"
                    />
                    <button onClick={fetchApiDataFilter}>Filtrar</button>
                </div>
                {apiData.map(api => (
                    <div className='api-info1'>
                        <div>
                            {api.images.length > 0 &&
                                <img src={`data:image/png;base64,${api.images[0]}`}
                                    alt="Imagem do Local"
                                    style={{
                                        width: '300px',
                                        height: '200px',
                                        objectFit: 'cover',
                                    }}
                                />
                            }
                        </div>
                        <div className="info-column">
                            <h5>Preço: R$ {api.price}</h5>
                            <h5>Proprietário: {api.locatarioName}</h5>
                            <h5>Endereço: {truncateEndereco(api.endereco)}</h5>
                            <h5>Cidade: {api.cidade}</h5>
                        </div>
                        <div className='button-container'>
                            <Link to={{ pathname: `/localDetalhes/${api.id}` }}>
                                <button title='Detalhes'>
                                    Detalhes
                                </button>
                            </Link>
                            {api.status === 'PATROCINADO' && (
                                <p style={{
                                    backgroundColor: '#ffd700',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: '20px',
                                    padding: '5px',
                                    borderRadius: '15px',
                                    fontFamily: 'Arial'
                                }}>
                                    {api.status}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const truncateEndereco = (description, maxLength = 20) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <div>
            {renderApiData()}
        </div>
    );
};

export default Locais;
