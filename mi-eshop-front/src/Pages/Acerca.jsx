import "./Background.css";

function Acerca() {
  return (
    <div className="background">
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          maxWidth: "900px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="/eshop.png"
          alt="ESHOP"
          style={{ width: "300px", marginRight: "2rem", borderRadius: "8px" }}
        />
        <div>
          <h2>Acerca de ESHOP</h2>
          <p>
            ESHOP es una plataforma de comercio electrónico dedicada a ofrecer
            los mejores productos del mercado con un enfoque en la calidad, el
            precio justo y una experiencia de usuario excepcional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Acerca;
