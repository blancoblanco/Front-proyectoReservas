import axios from "./axios";

// Obtener todas las categorías
export const getCategoriasRequest = async () => axios.get("/categorias");

// Crear una categoría
export const createCategoriaRequest = async (categoria) =>
  axios.post("/categoria", categoria);

// Actualizar una categoría
export const updateCategoriaRequest = async (id, categoria) =>
  axios.put(`/categoria/${id}`, categoria);

// Eliminar una categoría
export const deleteCategoriaRequest = async (id) =>
  axios.delete(`/categoria/${id}`);

// Obtener una sola categoría por ID
export const getCategoriaRequest = async (id) =>
  axios.get(`/categoria/${id}`);
