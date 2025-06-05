import { useNavigate } from "react-router-dom";
import Navbar from "../Componente/Navbar";

const Administrador = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100" style={{ background: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4" style={{ color: "#003087" }}>Panel de Administración</h2>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/productos")}
        >
          Ir a Productos
        </button>
      </div>
    </div>
  );
};

export default Administrador;