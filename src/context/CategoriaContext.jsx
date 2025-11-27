import { createContext, useContext, useState } from "react";
import {
  getCategoriasRequest,
  createCategoriaRequest,
  updateCategoriaRequest,
  deleteCategoriaRequest,
  getCategoriaRequest,
} from "../api/categoria.js"; // Asegúrate de tener estos métodos en tu API

const CategoriaContext = createContext();

export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context)
    throw new Error("useCategoria must be used within a CategoriaProvider");
  return context;
};

export function CategoriaProvider({ children }) {
  const [categorias, setCategorias] = useState([]);

  // Obtener todas las categorías
  const getCategorias = async () => {
    const res = await getCategoriasRequest();
    setCategorias(res.data);
  };

  // Obtener una sola categoría
  const getCategoria = async (id) => {
    const res = await getCategoriaRequest(id);
    return res.data;
  };

  // Crear categoría
  const createCategoria = async (categoria) => {
    return await createCategoriaRequest(categoria);
  };

  // Actualizar categoría
  const updateCategoria = async (id, categoria) => {
    return await updateCategoriaRequest(id, categoria);
  };

  // Eliminar categoría
  const deleteCategoria = async (id) => {
    return await deleteCategoriaRequest(id);
  };

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        getCategorias,
        getCategoria,
        createCategoria,
        updateCategoria,
        deleteCategoria,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
}
