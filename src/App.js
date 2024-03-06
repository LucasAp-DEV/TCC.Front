import {Routes, Route, useNavigate} from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Menu from './pages/Menu/Menu';
import Login from './pages/Login/Login';
// import { isAuthentication } from "./auth";
// import { useEffect } from "react";
import Usuarios from "./pages/Usuarios/Usuarios";
import Register from "./pages/Register/Register";

function App() {

  // const navigate = useNavigate()

  // // useEffect(() => {
  // //   if(!isAuthentication()) {
  // //     navigate("/login")
  // //   }

  // // },[navigate])


  return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route path="menu" element={<Menu />} />
                <Route path="usuarios" element={<Usuarios />} />
              </Route>
        </Routes>
    );
}

export default App;
