import React from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {


    const navigate = useNavigate()

    return (

        <div className='dashboard'>
            <a href="/menu" className="header-link">Menu</a>
            <a href="/login" className="header-link" onClick={() => { localStorage.removeItem('token') }}>Sair</a>
        </div>
    )
}

export default Header;
