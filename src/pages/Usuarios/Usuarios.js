import './Usuarios.css';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import LoadingTela from '../../components/Loading/LoadingTela';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import userIcons from '../../components/Icons e Imgs/user1.png';
import editIcon from '../../components/Icons e Imgs/pencil.png';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Usuarios = () => {
    const navigate = useNavigate();

    const [apiData, setApiData] = useState(null);
    const [apiData2, setApiData2] = useState(null);
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
                setApiData2(data);
                setEditData(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [idUser, userUpdated]);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPhoneValid = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleEdit = (field, value) => {
        MySwal.fire({
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
                if (field === "Email" && !isEmailValid(newValue)) {
                    MySwal.showValidationMessage("Insira um email valido.");
                    return false;
                }
                if (field === "Telefone" && !isPhoneValid(newValue)) {
                    MySwal.showValidationMessage("Insira um numero de telefone válido.");
                    return false;
                }
                const newEditData = { ...editData, [field.toLowerCase()]: newValue };
                setEditData(newEditData);
                setApiData2(newEditData);
                console.log(newEditData);
            },
            allowOutsideClick: () => !MySwal.isLoading(),
            customClass: {
                popup: 'swal-popup',
                header: 'swal-header',
                title: 'swal-title',
                closeButton: 'swal-close-button',
                icon: 'swal-icon',
                image: 'swal-image',
                input: 'swal-input',
                actions: 'swal-actions',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
                footer: 'swal-footer'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newEditData = { ...editData, [field.toLowerCase()]: result.value };
                setEditData(newEditData);
            }
        });
    };

    const handleEditRole = async () => {
        const roleOptions = {
            LOCADOR: 'LOCADOR',
            LOCATARIO: 'LOCATARIO'
        };

        const { value: selectedRole } = await MySwal.fire({
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
                MySwal.fire({
                    icon: 'error',
                    title: 'Você precisa ser um locador para acessar esta funcionalidade.',
                    text: ''
                });
            }
        } catch (error) {
            console.error(error);
            MySwal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: ''
            });
        }
    };

    const handleSaveLocais = async () => {
        try {
            if (typeUser === 0) {
                navigate("/registerLocais");
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Você precisa ser um locador para acessar esta funcionalidade',
                    text: ''
                });
            }
        } catch (error) {
            console.error(error);
            MySwal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: ''
            });
        }
    };

    const handleSaveChanges = async () => {
        try {
            const { value: password } = await MySwal.fire({
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
                allowOutsideClick: () => !MySwal.isLoading(),
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
            MySwal.fire({
                icon: 'success',
                title: 'Alterações salvas com sucesso!',
                text: ''
            });
            setUserUpdated(prevState => !prevState);
            setEditData({});
            if (response.status === 200) {
                const authToken = response.data.token;
                localStorage.setItem("token", authToken);
            }
        } catch (error) {
            console.error(error);
            MySwal.fire({
                icon: 'error',
                title: 'Erro ao salvar alterações!',
                text: ''
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
        );
    };

    return (
        <div>
            {renderApiData()}
        </div>
    );
};

export default Usuarios;
