import './Usuarios.css'
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import { jwtDecode } from 'jwt-decode';
import userIcons from '../../components/Icons e Imgs/user1.png'
import editIcon from '../../components/Icons e Imgs/pencil.png'

const Usuarios = () => {

    const [apiData, setApiData] = useState()
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUser = decodedToken.Id;

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                    const { data } = await api.get(`/user/${idUser}`);
                    setApiData(data);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [idUser]);

    const handleEdit = (field) => {
        console.log(`Editando ${field}`);
    };

    const renderApiData = () => {
        if (loading || !apiData) {
            return <LoadingTela />;
        }
        return (
            <div className="api-data-container">
                <div>
                    <div>
                        <img src={userIcons} alt="Ícone" className="img-small" />
                    </div>
                    <div className="api-infoLogin">
                        <h1>{apiData.nome}</h1>
                        <button className="edit-button" onClick={() => handleEdit('name')}>
                            Editar nome
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Login: {apiData.login}</h3>
                        <button className="edit-button" onClick={() => handleEdit('login')}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Email: {apiData.email}</h3>
                        <button className="edit-button" onClick={() => handleEdit('email')}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Telefone: {apiData.telephone}</h3>
                        <button className="edit-button" onClick={() => handleEdit('telephone')}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Cidade: {apiData.cidade}</h3>
                        <button className="edit-button" onClick={() => handleEdit('cidade')}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Role: {apiData.role}</h3>
                        <button className="edit-button" onClick={() => handleEdit('role')}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            {renderApiData()}
        </div>
    );
}


export default Usuarios;