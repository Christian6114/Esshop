import axios from "axios";

const API_URL = "http://localhost:5157/api/Productos"; // Ajusta según tu backend

const getToken = () => localStorage.getItem("token");

export const obtenerProductos = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const agregarProducto = async (producto) => {
  const response = await axios.post(API_URL, producto, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};
