import React from 'react'
import './Header.css'

const Header = () => {


    return (

        <div className='dashboard'>
            <a href="/menu" className="header-link">Menu</a>
            <a href="/login" className="header-link" onClick={() => { localStorage.removeItem('token') }}>Sair</a>
        </div>
    )
}

export default Header;
