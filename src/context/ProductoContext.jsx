import { createContext, useContext, useState } from "react";
import {
  getProductosRequest,
  createProductoRequest,
  updateProductoRequest,
  deleteProductoRequest,
  getProductoRequest,
} from "../api/producto";

const ProductoContext = createContext();

export const useProducto = () => {
  const context = useContext(ProductoContext);
  if (!context)
    throw new Error("useProducto must be used within a ProductoProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // Obtener todos los productos
  const getProductos = async () => {
    const res = await getProductosRequest();
    setProductos(res.data);
  };

  // Obtener un solo producto
  const getProducto = async (id) => {
    const res = await getProductoRequest(id);
    return res.data;
  };

  const createProducto = async (producto) => {
    return await createProductoRequest(producto);
  };

  const updateProducto = async (id, producto) => {
    return await updateProductoRequest(id, producto);
  };

  const deleteProducto = async (id) => {
    return await deleteProductoRequest(id);
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        getProducto,
        createProducto,
        updateProducto,
        deleteProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}
