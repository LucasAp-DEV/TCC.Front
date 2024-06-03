import React from 'react'
import './Header.css'
const Header = () => {
    return (
        <div>
            <div className='dashboard'>
                <a href="/locais" className="header-link" title='Menu'>SpaceSinc</a>
                <div className='header-right'>
                    <a href="/usuarios" className="header-link" title='Meus dados'>Perfil</a>
                    <a href="/contratoList" className="header-link" title='Contratos'>Contratos</a>
                    <a href="/login" className="header-link" title='Sair' onClick={() => { localStorage.removeItem('token') }}>Sair</a>
                </div>
            </div>
        </div>
    )
}

export default Header;
