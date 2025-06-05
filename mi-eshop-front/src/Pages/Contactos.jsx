import "./Background.css";

function Contacto() {
  return (
    <div className="background">
      <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", maxWidth: "600px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta o necesitas ayuda? Estamos para servirte.</p>
        <p><strong>Teléfono:</strong> +503 1234 5678</p>
        <p><strong>Correo:</strong> contacto@eshop.com</p>
      </div>
    </div>
  );
}

export default Contacto;
