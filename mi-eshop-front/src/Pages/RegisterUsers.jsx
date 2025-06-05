import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Asegúrate de importar los estilos

const RegisterUsers = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    direccion: "",
    telefono: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        setError("El email es requerido");
        return;
      }

      const payload = {
        Nombre: formData.nombre,
        Apellido: formData.apellido,
        Email: formData.email.toLowerCase(),
        Password: formData.password,
        Direccion: formData.direccion,
        Telefono: formData.telefono
      };

      const response = await axios.post("http://localhost:5157/api/Usuario/registro", payload);

      setSuccess("Usuario registrado exitosamente");
      setError(null);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        direccion: "",
        telefono: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data?.Message ||
          "Ups, no se pudo registrar. El usuario ya existe o el correo está repetido."
      );
      setSuccess(null);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-form">
        <h2>Registro de Usuario</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success} Redirigiendo a login...</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUsers;
