import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Button from '../../components/Button/Button'

const Menu = () => {

    const navigate = useNavigate()

    return (
        <div className="menu-container">
            <Button onClick={() => { navigate('/usuarios') }}
                text='Usuario' alt='Usuario' title='Usuario'
            />

            <Button onClick={() => { navigate('/locais') }}
                text='Locais' alt='Locais' title='Locais'
            />

            <Button onClick={() => { navigate('/contratos') }}
                text='Contratos' alt='Contratos' title='Contratos'
            />
        </div>
    );
}


export default Menu;