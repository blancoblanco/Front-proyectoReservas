import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null);          // carrito del usuario
  const [carritos, setCarritos] = useState([]);          // carritos del admin
  const [loading, setLoading] = useState(true);

  // 🔹 OBTENER EL CARRITO DEL USUARIO
  const getCarrito = async () => {
    try {
      const res = await axios.get("/carrito/mi-carrito");
      setCarrito(res.data.carrito);
    } catch (error) {
      console.error("Error obteniendo carrito:", error);

      if (error.response?.status === 404) {
        const nuevo = await axios.post("/carrito/crear");
        setCarrito(nuevo.data.carrito);
      }
    }
  };

  // 🔹 OBTENER TODOS LOS CARRITOS (ADMIN)
  const getCarritos = async () => {
    try {
      const res = await axios.get("/carrito");
      setCarritos(res.data);
    } catch (error) {
      console.error("Error obteniendo TODOS los carritos:", error);
    }
  };

  // 🔹 ELIMINAR CARRITO (ADMIN)
  const deleteCarrito = async (id) => {
    try {
      await axios.delete(`/carrito/${id}`);
      setCarritos((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error eliminando carrito:", error);
    }
  };

  // 🔹 AGREGAR PRODUCTO (actualiza carrito INMEDIATAMENTE)
  const addProductoAlCarrito = async (productoId) => {
    try {
      const res = await axios.post(`/carrito/agregar/${productoId}`);
      setCarrito(res.data.carrito);
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };

  useEffect(() => {
    getCarrito();
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        carritos,
        getCarrito,
        getCarritos,
        deleteCarrito,
        addProductoAlCarrito,
        loading,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
