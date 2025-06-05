import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Componente/Navbar";

const Footer = () => (
  <footer className="text-white text-center py-4" style={{ backgroundColor: '#003087', borderTop: '3px solid #FFC107' }}>
    <div className="container">
      <p className="mb-1">© 2025 Tienda El Salvador - Todos los derechos reservados</p>
      <p className="mb-0" style={{ fontSize: '0.9rem' }}>
        Inspirado en la vibrante cultura de El Salvador: pupusas, volcanes y mercados.
      </p>
    </div>
  </footer>
);

const CardProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener producto principal
        const resProducto = await fetch(`http://localhost:5157/productos/${id}`);
        if (!resProducto.ok) throw new Error("Producto no encontrado");
        const dataProducto = await resProducto.json();
        setProducto(dataProducto);
        setImagenPrincipal(dataProducto.imgProducto || "https://via.placeholder.com/600x500?text=Imagen+no+disponible");

        // Obtener productos relacionados (de la misma categoría)
        const resRelacionados = await fetch(`http://localhost:5157/productos?categoria=${dataProducto.categoria}&exclude=${id}`);
        const dataRelacionados = await resRelacionados.json();
        setProductosRelacionados(dataRelacionados.slice(0, 4));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert(`Agregaste ${cantidad} ${producto.nombre} al carrito`);
    // Aquí iría la lógica real para agregar al carrito
  };

  const cambiarImagen = (nuevaImagen) => {
    setImagenPrincipal(nuevaImagen);
  };

  if (error) {
    return (
      <div className="min-vh-100" style={{ background: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
        <Navbar />
        <div className="container text-center mt-5" style={{ minHeight: "60vh" }}>
          <div className="alert alert-danger py-4">
            <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            <h2 className="mt-3">¡Ups! Algo salió mal</h2>
            <p className="lead">{error}</p>
            <button 
              className="btn btn-primary mt-3 px-4" 
              onClick={() => navigate("/productos")}
              style={{ backgroundColor: "#003087", borderColor: "#003087" }}
            >
              <i className="bi bi-arrow-left me-2"></i>Volver a Productos
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-vh-100" style={{ background: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
        <Navbar />
        <div className="container text-center mt-5" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 fs-5">Cargando producto...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Generar miniaturas de ejemplo (en un caso real vendrían del backend)
  const miniaturas = [
    producto.imgProducto || "https://via.placeholder.com/100x100?text=Mini+1",
    "https://via.placeholder.com/100x100?text=Mini+2",
    "https://via.placeholder.com/100x100?text=Mini+3"
  ];

  return (
    <div className="min-vh-100" style={{ background: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      
      <div className="container py-4" style={{ minHeight: "80vh" }}>
        {/* Migas de pan */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ color: "#003087" }}>Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/productos" style={{ color: "#003087" }}>Productos</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        <div className="row g-4 mt-2">
          {/* Columna de imagen */}
          <div className="col-lg-6">
            <div className="bg-white p-3 rounded shadow-sm border">
              <img
                src={imagenPrincipal}
                alt={producto.nombre}
                className="img-fluid rounded mx-auto d-block"
                style={{ 
                  maxHeight: "500px", 
                  objectFit: "contain",
                  aspectRatio: "1/1"
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x500?text=Imagen+no+disponible";
                }}
              />
              {/* Miniaturas */}
              <div className="d-flex justify-content-center mt-3 gap-2">
                {miniaturas.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Vista ${index + 1} de ${producto.nombre}`}
                    className={`img-thumbnail ${imagenPrincipal === img ? 'border-primary' : ''}`}
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      cursor: "pointer",
                      objectFit: "cover"
                    }}
                    onClick={() => cambiarImagen(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna de información */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded shadow-sm border h-100">
              <h1 className="mb-3" style={{ color: "#003087", fontSize: "2rem", fontWeight: "600" }}>
                {producto.nombre}
              </h1>

              {/* Marca */}
              <div className="mb-3">
                <span className="badge bg-light text-dark border" style={{ fontSize: "0.9rem" }}>
                  {producto.marca || "Marca no especificada"}
                </span>
              </div>

              {/* Precio */}
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <span className="text-danger fs-3 fw-bold me-2">
                    ${producto.precio.toFixed(2)}
                  </span>
                  {producto.precioOriginal && producto.precioOriginal > producto.precio && (
                    <>
                      <span className="text-decoration-line-through text-muted fs-5">
                        ${producto.precioOriginal.toFixed(2)}
                      </span>
                      <span className="badge bg-danger ms-2">
                        {Math.round((1 - producto.precio/producto.precioOriginal) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4 border-top pt-3">
                <h3 className="fs-5 fw-bold">Descripción</h3>
                <p className="text-muted">{producto.descripcion || "Descripción no disponible"}</p>
              </div>

              {/* Características */}
              <div className="mb-4 border-top pt-3">
                <h3 className="fs-5 fw-bold mb-3">Detalles del Producto</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Categoría:</strong> {producto.categoria || "No especificada"}
                  </li>
                  <li className="mb-2">
                    <strong>SKU:</strong> {producto.id_producto || "N/A"}
                  </li>
                  <li className="mb-2">
                    <strong>Disponibilidad:</strong> 
                    <span className={`ms-2 ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                      {producto.stock > 0 ? `En stock (${producto.stock} unidades)` : "Agotado"}
                    </span>
                  </li>
                  {producto.especificaciones && Object.entries(producto.especificaciones).map(([key, value]) => (
                    <li className="mb-2" key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selector de cantidad y botón de compra */}
              <div className="border-top pt-4 mt-auto">
                {producto.stock > 0 ? (
                  <>
                    <div className="d-flex align-items-center mb-4">
                      <label htmlFor="cantidad" className="me-3 fw-bold">Cantidad:</label>
                      <div className="input-group" style={{ width: "120px" }}>
                        <button 
                          className="btn btn-outline-secondary" 
                          onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center" 
                          value={cantidad}
                          min="1"
                          max={producto.stock}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setCantidad(Math.max(1, Math.min(value, producto.stock)));
                          }}
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          onClick={() => setCantidad(Math.min(cantidad + 1, producto.stock))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <button
                        className="btn flex-grow-1 py-2"
                        onClick={handleAddToCart}
                        style={{ 
                          backgroundColor: "#FFC107", 
                          color: "#003087",
                          fontWeight: "500",
                          border: "none"
                        }}
                      >
                        <i className="bi bi-cart-plus me-2"></i>Añadir al carrito
                      </button>
                      <button
                        className="btn btn-outline-warning py-2"
                        onClick={() => alert("Compra rápida seleccionada")}
                        style={{ color: "#003087", borderColor: "#FFC107" }}
                      >
                        <i className="bi bi-lightning-fill me-2"></i>Comprar ahora
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="alert alert-warning">
                   
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de productos relacionados */}
        {productosRelacionados.length > 0 && (
          <div className="mt-5 pt-4 border-top">
            <h3 className="mb-4" style={{ color: "#003087" }}>Productos relacionados</h3>
            <div className="row row-cols-2 row-cols-md-4 g-4">
              {productosRelacionados.map((prod) => (
                <div className="col" key={prod.id_producto}>
                  <div 
                    className="card h-100 border-0" 
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '2px solid #0052CC',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s'
                    }}
                    onClick={() => navigate(`/producto/${prod.id_producto}`)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = ''}
                  >
                    <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#F8F9FA' }}>
                      <img
                        src={prod.imgProducto || "https://via.placeholder.com/300x200?text=Producto"}
                        alt={prod.nombre}
                        className="card-img-top"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '10px',
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: '#003087', fontWeight: '500' }}>
                        {prod.nombre}
                      </h5>
                      <p className="card-text text-muted">${prod.precio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CardProducto;