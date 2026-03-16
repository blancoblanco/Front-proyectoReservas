import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null);          // carrito del usuario
  const [carritos, setCarritos] = useState([]);          // carritos del admin
  const [loading] = useState(true);

  // 🔹 OBTENER EL CARRITO DEL USUARIO
  const getCarrito = async () => {
    try {
      const res = await axios.get("/carritos");
      if (res.data && res.data.length > 0) {
        setCarrito(res.data[0]);
      } else {
        const nuevo = await axios.post("/carrito");
        setCarrito(nuevo.data);
      }
    } catch (error) {
      console.error("Error obteniendo carrito:", error);
    }
  };

  // 🔹 OBTENER TODOS LOS CARRITOS (ADMIN)
  const getCarritos = async () => {
    try {
      const res = await axios.get("/carritos");
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
  const addProductoAlCarrito = async (productoId, cantidad = 1) => {
    try {
      const res = await axios.post("/carrito/agregar", { productoId, cantidad });
      setCarrito(res.data);
    } catch (error) {
      console.error("Error agregando producto:", error);
      throw error;
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

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
