import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Layout.css';

const Layout = () => {
    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
