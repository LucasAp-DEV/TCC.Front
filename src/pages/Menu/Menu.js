import { useNavigate } from 'react-router-dom'
import './Menu.css'

const Menu = () => {

    const navigate = useNavigate()

    return (
        <div className="menu-container">
            <button onClick={() => { navigate('/usuarios') }}
                alt='Usuario' title='Usuario'>
                Usuario
            </button>
    
            <button onClick={() => { navigate('/locais') }}
                alt='Locais' title='Locais'>
                Locais
            </button>
    
            <button onClick={() => { navigate('/contratoList') }}
                alt='Contratos' title='Contratos'>
                Contratos
            </button>
        </div>
    );
    
}


export default Menu;