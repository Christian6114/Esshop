import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Productos from "./Pages/Productos";
import CardProducto from "./Pages/CardProducto";
import RegisterUsers from "./Pages/RegisterUsers";
import Perfil from "./Pages/Perfil";
import Administrador from "./Pages/Administrador";
import Acerca from "./Pages/Acerca";
import Contacto from "./Pages/Contactos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/productos" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<CardProducto />} />
        <Route path="/register" element={<RegisterUsers />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
