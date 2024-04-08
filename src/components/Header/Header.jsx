import React from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {


    const navigate = useNavigate()

    return (

        <div className='dashboard'>
            <Button onClick={() => { navigate('/menu') }}
                text="Menu"
            />
            <Button onClick={() => { navigate('/login'); localStorage.removeItem('token') }}
                text='Sair' alt='Sair' title='Sair'
            />

        </div>
    )
}

export default Header;
