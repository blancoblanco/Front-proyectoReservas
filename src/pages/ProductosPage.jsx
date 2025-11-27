import { useEffect } from "react";
import { useProducto } from "../context/ProductoContext";
import "../css/producto.css";

function ProductosPage() {
  const { getProductos, productos } = useProducto();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container-items">
      {productos.map((producto) => (
        <div key={producto._id} className="item">
          <figure>
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721500_sd.jpg" alt="producto" />
          </figure>
          <div className="info-product">
            <h2>{producto.nombre}</h2>
            <p className="price">${producto.precio}</p>
            <button className="btn-add-cart">Agregar al carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductosPage;
