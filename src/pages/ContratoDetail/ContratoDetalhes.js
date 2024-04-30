import React, { useEffect, useState } from 'react';
import { useLocal } from '../../LocalContext';
import DetalhesLocal2 from '../../components/Contrato/DetalhesLocal2';
import Loading from '../../components/Loading/Loading';

const ContratoDetalhes = () => {

    const { localData } = useLocal();
    const [saving, setSaving] = useState(false);

    return (
        <div style={{marginTop: "100px"}}>
            <DetalhesLocal2 
            localData={localData}
            />
            {/* <button onClick={saveData} disabled={saving}>
                {saving ? <Loading /> : 'Salvar'}
            </button> */}
            <div style={{ marginTop: '20px' }}>
                <a href="/locais" className='exitPassword'>Voltar aos Locais</a>
            </div>
        </div>
    );
}

export default ContratoDetalhes;