import axios from "./axios";

// Obtener todos los carritos del usuario
export const getCarritosRequest = async () =>
  axios.get("/carritos", { withCredentials: true });

// Crear un carrito o agregar un producto al carrito
export const createCarritoRequest = async (carrito) =>
  axios.post("/carrito", carrito, { withCredentials: true });

// Actualizar la cantidad de un producto en el carrito
export const updateCarritoRequest = async (id, carrito) =>
  axios.put(`/carrito/${id}`, carrito, { withCredentials: true });

// Eliminar un carrito
export const deleteCarritoRequest = async (id) =>
  axios.delete(`/carrito/${id}`, { withCredentials: true });

// Obtener un solo carrito por ID
export const getCarritoRequest = async (id) =>
  axios.get(`/carrito/${id}`, { withCredentials: true });
