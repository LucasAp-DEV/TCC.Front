import './Usuarios.css'
import { useEffect, useState } from 'react';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import userIcons from '../../components/Icons e Imgs/user1.png'
import editIcon from '../../components/Icons e Imgs/pencil.png'

const Usuarios = () => {

    const [apiData, setApiData] = useState();
    const [apiData2, setApiData2] = useState();
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState({});
    const [userUpdated, setUserUpdated] = useState(false);

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
                    setApiData2(data)
                    setEditData(data)
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [idUser, userUpdated]);

    const handleEdit = (field, value) => {
        Swal.fire({
            title: `Editar ${field}`,
            input: "text",
            inputValue: value,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: (newValue) => {
                const newEditData = { ...editData, [field.toLowerCase()]: newValue };
                setEditData(newEditData);
                setApiData2(newEditData)
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const newEditData = { ...editData, [field.toLowerCase()]: result.value };
                setEditData(newEditData);
            }
        });
    };

    const handleEditRole = async () => {
        const roleOptions = {
            ADMIN: 'ADMIN',
            USER: 'USER'
        };
        
        const { value: selectedRole } = await Swal.fire({
            title: 'Editar Role',
            input: 'select',
            inputOptions: roleOptions,
            inputPlaceholder: 'Selecione um role',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== '') {
                        resolve();
                    } else {
                        resolve('Você precisa selecionar um role.');
                    }
                });
            }
        });
        
        if (selectedRole) {
            const newEditData = { ...editData, role: selectedRole };
            setEditData(newEditData);
            setApiData2(newEditData);
        }
    };
    

    const handleSaveChanges = async () => {
        try {
            const newEditData = { ...apiData, ...editData };
            await api.put(`/user/update/${idUser}`, newEditData);
            Swal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: 'O cadastro do usuário foi atualizado.'
            });
            setUserUpdated(prevState => !prevState);
            setEditData({});
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar atualizar o cadastro do usuário. Por favor, tente novamente mais tarde.'
            });
        }
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
                    <div className="api-infoNome">
                        <h1>{apiData2.nome}</h1>
                        <button className="edit-button" onClick={() => handleEdit('Nome', apiData.nome)}>
                            Editar nome
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Login: {apiData2.login}</h3>
                        <button className="edit-button" onClick={() => handleEdit('Login', apiData.login)}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Email: {apiData2.email}</h3>
                        <button className="edit-button" onClick={() => handleEdit('Email', apiData.email)}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Telefone: {apiData2.telephone}</h3>
                        <button className="edit-button" onClick={() => handleEdit('Telephone', apiData.telephone)}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className="api-info">
                        <h3>Role: {apiData2.role}</h3>
                        <button className="edit-button" onClick={() => handleEditRole('Role', apiData.role)}>
                            <img src={editIcon} alt="Editar" className="icon-edit" />
                        </button>
                    </div>
                    <div className='info2'>
                        <button onClick={handleSaveChanges}>Salvar Alterações</button>
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