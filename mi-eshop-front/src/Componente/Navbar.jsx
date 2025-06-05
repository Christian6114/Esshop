import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Supón que guardas el nombre y token en localStorage al hacer login
    const nombre = localStorage.getItem("nombre");
    const token = localStorage.getItem("token");
    if (nombre && token) {
      setUser({ nombre });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003087' }}>
      <div className="container">
        <a className="navbar-brand" href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          ESHOP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/acerca">Acerca</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contacto</a>
            </li>
          </ul>
          <div className="d-flex gap-2">
            {user ? (
              <>
                <span className="navbar-text text-white fw-bold">
                  {user.nombre}
                </span>
                <button
                  onClick={() => navigate("/perfil")}
                  className="btn btn-outline-light"
                >
                  Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-warning"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-light"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-outline-light"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;