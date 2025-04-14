import axios from "axios";

const API_URL = "http://192.168.0.3:3000/api"; 

export const ApiDelivery = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Función para manejar la solicitud de restablecimiento de contraseña
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await ApiDelivery.post("/auth/forgot-password", { email });
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error al solicitar el restablecimiento de contraseña:", error);
    throw error; // Lanza el error para que lo maneje quien llame a esta función
  }
};
