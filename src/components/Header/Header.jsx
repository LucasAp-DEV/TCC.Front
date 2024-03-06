import React from 'react'
import Button from '../Button/Button'
import {useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {

    const navigate = useNavigate()

  return (

      <div className='dashboard'>
                <Button onClick={() => { navigate('/menu') }} 
                text="Inicio"
                />
                <ul>
                    <Button onClick={() => { navigate('/usuarios') }} 
                    text='Usuarios' alt='Usuarios' title='Usuarios'
                    />

                    <Button onClick={() => { navigate('/register') }} 
                    text='Register' alt='Register' title='Register'
                    />

                    <Button onClick={() => { navigate('/login'); localStorage.removeItem('token')}} 
                    text='Sair' alt='Sair' title='Sair'
                    />
                </ul>
            </div>
  )
}
