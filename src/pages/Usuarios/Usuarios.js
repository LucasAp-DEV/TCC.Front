import './Usuarios.css'
import { useEffect, useState } from 'react';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import userIcons from '../../components/Icons e Imgs/user1.png'
import editIcon from '../../components/Icons e Imgs/pencil.png'
import UserProfile from '../../components/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {

    const navigate = useNavigate()

    const [apiData, setApiData] = useState();
    const [apiData2, setApiData2] = useState();
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState({});
    const [userUpdated, setUserUpdated] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUser = decodedToken.Id;
    const typeUser = decodedToken.Role;

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/user/${idUser}`);
                setApiData(data);
                setApiData2(data)
                setEditData(data)
                setLoading(false);
                console.log(data)
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
                console.log(newEditData)
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

    const handleUpdateLocais = async () => {
        try {
            if (typeUser === 0) { 
                navigate("/updateLocaisList");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Você precisa ser um locatario para acessar esta funcionalidade.'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar realizar esta ação.'
            });
        }
    };

    const handleSaveLocais = async () => {
        try {
            if (typeUser === 0) { 
                navigate("/registerLocais");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Você precisa ser um locatario para acessar esta funcionalidade.'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar realizar esta ação.'
            });
        }
    };


    const handleSaveChanges = async () => {
        try {
            const { value: password } = await Swal.fire({
                title: 'Confirme sua senha',
                input: 'password',
                inputPlaceholder: 'Digite sua senha',
                inputAttributes: {
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async (enteredPassword) => {
                    try {
                        return enteredPassword;
                    } catch (error) {
                        throw new Error(error.message);
                    }
                }
            });
            const newEditData = { ...apiData, ...editData, password };
            const response = await api.put(`/user/update/${idUser}`, newEditData);
            Swal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: 'O cadastro do usuário foi atualizado.'
            });
            setUserUpdated(prevState => !prevState);
            setEditData({});
            if (response.status === 200) {
                const authToken = response.data.token;
                localStorage.setItem("token", authToken);
              }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: 'Ocorreu um erro ao tentar atualizar o cadastro do usuário.'
            });
        }
    };
    


    const renderApiData = () => {
        if (loading || !apiData) {
            return <LoadingTela />;
        }
        return (
            <div className="api-data-container">
                <UserProfile
                    apiData={apiData}
                    apiData2={apiData2}
                    userIcons={userIcons}
                    editIcon={editIcon}
                    handleEdit={handleEdit}
                    handleEditRole={handleEditRole}
                    handleSaveChanges={handleSaveChanges}
                    handleSaveLocais={handleSaveLocais}
                    handleUpdateLocais={handleUpdateLocais}
                />
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