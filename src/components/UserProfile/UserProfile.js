import React from 'react';
import './UserProfile.css'

function UserProfile({ apiData2, apiData, userIcons, editIcon, handleEdit, handleEditRole, handleSaveChanges, handleSaveLocais }) {

    return (
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
                <h3>Telefone: {apiData2.telefone}</h3>
                <button className="edit-button" onClick={() => handleEdit('Telefone', apiData.telefone)}>
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
                <button onClick={handleSaveLocais}>Cadastrar um Local</button>
            </div>
        </div>
    );
}

export default UserProfile;
