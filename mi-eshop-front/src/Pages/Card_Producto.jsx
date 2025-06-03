import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Card_Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5157/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => setProducto(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Error: {error}</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/productos")}>
          Volver a Productos
        </button>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/productos")}
      >
        ← Volver a Productos
      </button>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={producto.imgProducto || "https://via.placeholder.com/500x400?text=Producto"}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ objectFit: "cover", maxHeight: "400px" }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/500x400?text=Error")}
          />
        </div>
        <div className="col-md-6 d-flex flex-column">
          <h2 style={{ color: "#003087", fontWeight: "600" }}>{producto.nombre}</h2>
          <p className="text-muted">{producto.descripcion}</p>
          <h4 className="text-warning mb-4">${producto.precio.toFixed(2)}</h4>

          <div className="mb-4">
            <p><strong>Categoría:</strong> {producto.categoria || "No especificada"}</p>
            <p><strong>Marca:</strong> {producto.marca || "No especificada"}</p>
          </div>

          <button
            className="btn btn-warning mt-auto"
            onClick={() => alert(`Producto ${producto.nombre} añadido al carrito (pendiente)`)}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card_Producto;