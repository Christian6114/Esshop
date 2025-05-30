import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5157/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => alert("Error al cargar productos"));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/registro")}>Registrarse</button>
      </div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(prod => (
          <li key={prod.id}>
            {prod.nombre} - ${prod.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;