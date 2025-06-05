import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Componente/Navbar";

const Perfil = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtén los datos del usuario desde localStorage (o desde tu API si tienes endpoint)
    const nombreGuardado = localStorage.getItem("nombre");
    const token = localStorage.getItem("token");
    // Si no hay token, redirige a login
    if (!token) {
      navigate("/login");
      return;
    }
    setNombre(nombreGuardado || "");
    // Si guardas el email en localStorage, puedes mostrarlo aquí
    // setEmail(localStorage.getItem("email") || "");
  }, [navigate]);

  return (
    <div className="min-vh-100" style={{ background: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h2 className="mb-4" style={{ color: "#003087" }}>Mi Perfil</h2>
                <div className="mb-3">
                  <span className="fw-bold">Nombre:</span>
                  <div>{nombre}</div>
                </div>
                {/* Si tienes más datos, agrégalos aquí */}
                {/* <div className="mb-3">
                  <span className="fw-bold">Correo:</span>
                  <div>{email}</div>
                </div> */}
                <button
                  className="btn btn-outline-warning mt-3"
                  onClick={() => navigate("/productos")}
                >
                  Volver a productos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;