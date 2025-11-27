import { useEffect } from "react";
import { useProducto } from "../context/ProductoContext";
import "../css/producto.css";

function ProductosPage() {
  const { getProductos, productos } = useProducto();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto._id} className="cart-box">
          <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721500_sd.jpg" />
          <div className="cart-content">
            <h3>{producto.nombre}</h3>
            <p>Precio: {producto.precio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductosPage;
