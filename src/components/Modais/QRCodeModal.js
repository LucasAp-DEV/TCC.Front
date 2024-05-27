import React from 'react';
import { FaCopy } from 'react-icons/fa';
import './QRCodeModal.css';

const QRCodeModal = ({ qrCodeData, setShowQRCodeModal }) => {

  const getPartialQRCode = () => {
    if (!qrCodeData) return '';
    const qrCode = qrCodeData.data.pointOfInteraction.transactionData.qrCode;
    return qrCode.slice(0,50);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" title='Fechar' onClick={() => setShowQRCodeModal(false)}>&times;</span>
        <h1 className="modal-title">QR Code para Pagamento</h1>
        {qrCodeData && (
          <div className="qr-code-container">
            <img
              className="qr-code-image" title='QRCode'
              src={`data:image/png;base64,${qrCodeData.data.pointOfInteraction.transactionData.qrCodeBase64}`}
              alt="QR Code"
            />
            <div className="copy-container">
              <div>
                <h1>Valor: R$ 30,00</h1>
                <p>{getPartialQRCode()}</p>
              </div>
              <div>
                <FaCopy
                  className="copy-icon" title='Copiar'
                  onClick={() => navigator.clipboard.writeText(qrCodeData.data.pointOfInteraction.transactionData.qrCode)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeModal;
