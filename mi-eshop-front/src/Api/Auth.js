import axios from "axios";

const API_URL = "http://localhost:5157/api/Auth"; // 

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};
