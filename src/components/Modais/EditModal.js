import React from 'react';
import './EditModal.css';
import LoadingTela from '../Loading/LoadingTela';

const EditModal = ({ setShowEditModal, editedDescription, setEditedDescription, editedValue, setEditedValue, handleSaveChanges, saving }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h1>Editar Local</h1>
            <label htmlFor="description">Descrição:</label>
            <textarea
                required
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="textarea"
                rows={5}
            />
            <label htmlFor="value">Valor:</label>
            <input
                required
                type="number"
                id="value"
                value={editedValue}
                onChange={(e) => setEditedValue(Number(e.target.value))}
                className="input"
            />
            <button onClick={handleSaveChanges} disabled={saving}>
                {saving ? <LoadingTela /> : 'Salvar Alterações'}
            </button>
        </div>
    </div>
);

export default EditModal;
