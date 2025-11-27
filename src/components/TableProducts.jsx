import { useEffect } from "react";
import { useProducto } from "../context/ProductoContext";
import { Link } from "react-router-dom";

function TableProducts() {
  const { getProductos, productos, deleteProducto } = useProducto();

  useEffect(() => {
    getProductos();
  }, []);

  const handleDelete = async (id, nombre) => {
    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar el producto "${nombre}"?`
    );
    if (confirmDelete) {
      try {
        await deleteProducto(id); // elimina en backend
        // actualizar estado local llamando otra vez a getProductos
        getProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  return (
    <div className="recent_order">
      <h2>Productos</h2>

      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>stock</th>
            <th>precio</th>
            <th>categorias</th>
            <th>editar</th>
            <th>eliminar</th>
          </tr>
        </thead>

        <tbody>
          {productos.length > 0 ? (
            productos.map((p) => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>{p.stock}</td>
                <td>{p.precio}</td>
                <td>{p.categorias?.map((cat) => cat.nombre).join(", ")}</td>

                {/* BOTÓN EDITAR */}
                <td style={{ cursor: "pointer" }}>
                  <Link to={`/producto/${p._id}`} className="warning">
                    editar
                  </Link>
                </td>

                {/* BOTÓN ELIMINAR */}
                <td
                  className="danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(p._id, p.nombre)}
                >
                  eliminar
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableProducts;
