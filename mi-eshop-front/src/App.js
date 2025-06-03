import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Productos from "./Pages/Productos";
import Card_Producto from "./Pages/Card_Producto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/productos" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<Card_Producto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;