import React from 'react'
import './Header.css'
const Header = () => {


    return (
        <div>
            <div className='dashboard'>
                <a href="/menu" className="header-link" title='Menu'>Menu</a>
                <a href="/login" className="header-link" title='Sair' onClick={() => { localStorage.removeItem('token') }}>Sair</a>
            </div>
        </div>
    )
}

export default Header;
