import { useEffect, useState } from "react";
import { useProducto } from "../context/ProductoContext";
import { useCarrito } from "../context/CarritoContext";
import "../css/producto.css";

function ProductosPage() {
  const { getProductos, productos } = useProducto();
  const { addProductoAlCarrito, getCarrito, carrito } = useCarrito();

  const [loadingById, setLoadingById] = useState({});

  useEffect(() => {
    getProductos();
    getCarrito(); // ⬅ Cargar carrito al entrar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (productoId) => {
    setLoadingById(prev => ({ ...prev, [productoId]: true }));

    await addProductoAlCarrito(productoId);

    await getCarrito(); // ⬅️ Actualizar carrito inmediatamente

    setLoadingById(prev => ({ ...prev, [productoId]: false }));
  };

  return (
    <div className="container-items">
      {productos.map((producto) => {
        const itemInCart = carrito?.productos?.find(
          p => p.producto._id === producto._id
        );

        return (
          <div key={producto._id} className="item">
            <figure>
              <img
                src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721500_sd.jpg"
                alt=""
              />
            </figure>

            <div className="info-product">
              <h2>{producto.nombre}</h2>
              <p className="price">${producto.precio}</p>

              <button
                className="btn-add-cart"
                disabled={loadingById[producto._id]}
                onClick={() => handleAdd(producto._id)}
              >
                {loadingById[producto._id] ? "Agregando..." : "Agregar al carrito"}
              </button>

              <p>
                {itemInCart
                  ? `Cantidad en carrito: ${itemInCart.cantidad}`
                  : "No agregado aún"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductosPage;

