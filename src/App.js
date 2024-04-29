import { Routes, Route} from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Menu from './pages/Menu/Menu';
import Login from './pages/Login/Login';
import Locais from './pages/Locais/Locais';
// import { isAuthentication } from "./auth";
// import { useEffect } from "react";
import Usuarios from "./pages/Usuarios/Usuarios";
import Register from "./pages/Register/Register";
import Contrato from "./pages/Contrato/Contrato";
import RegisterLocais from './pages/RegisterLocais/RegisterLocais';
import ContratoList from "./pages/ContratoList/ContratoList";

function App() {

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuthentication()) {
  //     navigate("/login")
  //   }

  // }, [navigate])


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="menu" element={<Menu />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="locais" element={<Locais />} />
        <Route path="contrato" element={<Contrato />} />
        <Route path="registerlocais" element={<RegisterLocais />} />
        <Route path="contratoList" element={<ContratoList />} />
      </Route>
    </Routes>
  );
}

export default App;
