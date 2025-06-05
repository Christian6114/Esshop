import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      console.log("Datos enviados al backend:", payload);

      const response = await axios.post("http://localhost:5157/api/Usuario/registro", payload);

      console.log("Respuesta backend:", response.data);
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

      // Redirigir a /login después de 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      setError(error.response?.data?.Message || "Ups no se pudo registrar, el usuario ya existe o pusiste mismo correo");
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success} Redirigiendo a login...
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            placeholder="Ingrese su nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            placeholder="Ingrese su apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            placeholder="Ingrese su dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            placeholder="Ingrese su teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterUsers;
