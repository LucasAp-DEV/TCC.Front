import React from 'react';
import './HighlightModal.css';

const HighlightModal = ({ setShowHighlightModal, handlePayment }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <span className="close-button" onClick={() => setShowHighlightModal(false)}>&times;</span>
      <h1 className="modal-title">Termos de Destaque de Local</h1>
      <p>Por favor, leia atentamente os seguintes termos antes de destacar um local:</p>
      <p>- Ao destacar um local, você concorda em pagar a taxa correspondente.</p>
      <p>- O destaque do local está sujeito à disponibilidade e aceitação.</p>
      <p>- Uma vez destacado, o local será promovido com destaque em nossa plataforma.</p>
      <p>- Ao clicar em "Destacar", você concorda com os termos acima.</p>
      <button className="highlight-button" onClick={handlePayment}>Destacar</button>
    </div>
  </div>
);

export default HighlightModal;
