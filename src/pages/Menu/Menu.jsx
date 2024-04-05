import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Button from '../../components/Button/Button'
import BoxItem from '../../components/BoxItem/BoxItem' 

const Menu = () => {

    const navigate = useNavigate()

    const rotas = () => {
        navigate("/usuarios");
    }


    return (
        <div >
        <div className='boxMenu'>
            <BoxItem
            nome='Leonardo Eventos'
            endereco={'Rua São Paulo - Jardim Primavera'}
            valor={'890,30'}
            ddd={'44'}
            contato={'9 91334455'}
            />
        </div>

        <div className='boxMenu'>
            <BoxItem
            nome={'Festas Kids'}
            endereco={'Avenida Farias'}
            valor={'1.000,00'}
            ddd={'44'}
            contato={'999348765'}    
            />
            </div>
        
        <div className='boxMenu'>
            <BoxItem
            nome={'Fazenda do Tião'}
            endereco={'Araruna-PR'}
            valor={'1.400,00'}
            ddd={'44'}
            contato={'999398745'}    
            />
            </div>
                
                </div>


            /*
            <Button onClick={rotas} text='Usuarios' />
    <h1>Levar para Usuarios</h1> */
    );
}


export default Menu;