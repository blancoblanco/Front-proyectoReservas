import axios from "./axios";

// Obtener todos los productos
export const getProductosRequest = async () => axios.get("/productos");

// Crear un producto
export const createProductoRequest = async (producto) =>
  axios.post("/producto", producto);

// Actualizar un producto
export const updateProductoRequest = async (id, producto) =>
  axios.put(`/producto/${id}`, producto);

// Eliminar un producto
export const deleteProductoRequest = async (id) =>
  axios.delete(`/producto/${id}`);

// Obtener un solo producto por ID
export const getProductoRequest = async (id) =>
  axios.get(`/producto/${id}`);
