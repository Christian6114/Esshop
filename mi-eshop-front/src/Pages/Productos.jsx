import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Componente/Navbar";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5157/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
     
  }, []);

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: '#FFFFFF',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* Main Content */}
      <main className="container py-5">
        <h2 className="text-center mb-4" style={{ color: '#003087', fontWeight: '600' }}>
          Nuestros Productos
        </h2>
        {productos.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productos.map(prod => (
              <div key={prod.id_producto} className="col">
                <div
                  className="card h-100 border-0"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #0052CC',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleProductClick(prod.id_producto)}
                >
                  <div style={{ height: '250px', overflow: 'hidden', backgroundColor: '#F8F9FA' }}>
                    <img
                      src={prod.imgProducto || "https://via.placeholder.com/300x200?text=Producto"}
                      alt={prod.nombre}
                      className="card-img-top"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        padding: '10px',
                      }}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300x200?text=Error")}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#003087', fontWeight: '500' }}>
                      {prod.nombre}
                    </h5>
                    <p className="card-text text-muted">${prod.precio.toFixed(2)}</p>
                    <button
                      className="btn w-100"
                      style={{ backgroundColor: '#FFC107', color: '#003087', fontWeight: '500' }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from triggering
                        alert(`Añadir ${prod.nombre} al carrito (funcionalidad pendiente)`);
                      }}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No hay productos disponibles.</p>
        )}
      </main>

      {/* Footer */}
      <footer
        className="text-white text-center py-4"
        style={{
          backgroundColor: '#003087',
          borderTop: '3px solid #FFC107',
        }}
      >
        <div className="container">
          <p className="mb-1">© 2025 Tienda El Salvador - Todos los derechos reservados</p>
          <p className="mb-0" style={{ fontSize: '0.9rem' }}>
            Inspirado en la vibrante cultura de El Salvador: pupusas, volcanes y mercados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Productos;