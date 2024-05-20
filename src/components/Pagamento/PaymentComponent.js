import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentComponent = ({ handlePayment }) => {
    const [cpf, setCpf] = useState('');

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const confirmHighlight = () => {
        Swal.fire({
            title: 'Destacar Local',
            text: 'Você está prestes a destacar seu local com a divulgação Premium. Tem certeza?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handlePayment(cpf);
            }
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <h1>Destacar Local</h1>
                <label htmlFor="cpf">CPF:</label>
                <input
                    required
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="input"
                />
                <div>
                    <button onClick={confirmHighlight}>Destacar</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;
