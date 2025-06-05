import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const loginPayload = {
      email: email.toLowerCase(),
      password,
    };

    try {
      console.log("Enviando login:", loginPayload); // 📤 Mostrar qué se va a enviar

      const res = await fetch("http://localhost:5157/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();

      console.log("Respuesta del servidor:", data); // 📥 Mostrar respuesta recibida

      if (!res.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      if (data.token && data.nombre && data.rol) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("rol", data.rol);

        if (data.rol === "admin") {
          navigate("/administrador");
        } else {
          navigate("/productos");
        }
        window.location.reload(); // Opcional
      } else {
        throw new Error("No se recibió token, nombre o rol de autenticación");
      }
    } catch (error) {
      console.error("Error al hacer login:", error); // 🐞 Mostrar error
      setError(error.message);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
