import { Routes, Route } from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Locais from './pages/Locais/Locais';
import Usuarios from "./pages/Usuarios/Usuarios";
import Register from "./pages/Register/Register";
import Contrato from "./pages/Contrato/Contrato";
import RegisterLocais from './pages/RegisterLocais/RegisterLocais';
import ContratoList from "./pages/ContratoList/ContratoList";
import ContratoDetalhes from "./pages/ContratoDetail/ContratoDetalhes";
import LocalDetalhe from './pages/LocalDetalhe/LocalDetalhe';
import UpdateLocaisList from "./pages/UpdateLocais/UpdateLocaisList";
import UpdateLocais from "./pages/UpdateLocais/UpdateLocais";
import { useEffect } from "react";
import { isAuthentication } from "./auth";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    const isProtectedRoute = !['/register', '/login'].includes(path);

    if (!isAuthentication() && isProtectedRoute) {
      localStorage.removeItem('token')
      navigate('/login');
    }
  }, [navigate]);



  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="locais" element={<Locais />} />
        <Route path="contrato/:idLocal" element={<Contrato />} />
        <Route path="registerlocais" element={<RegisterLocais />} />
        <Route path="contratolist" element={<ContratoList />} />
        <Route path="contratoDetalhes/:idContrato" element={<ContratoDetalhes />} />
        <Route path="localDetalhes/:idLocal" element={<LocalDetalhe />} />
        <Route path="updateLocaisList" element={<UpdateLocaisList />} />
        <Route path="updatelocais/:idLocal" element={<UpdateLocais />} />
      </Route>
    </Routes>
  );
}

export default App;
