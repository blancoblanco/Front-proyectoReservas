import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";

function TableCarrito() {
  const { carritos, getCarritos, deleteCarrito } = useCarrito();

  useEffect(() => {
    getCarritos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este carrito?")) {
      await deleteCarrito(id);
    }
  };

  const listaCarritos = Array.isArray(carritos) ? carritos : [];

  return (
    <div className="recent_order">
      <h2>Carritos</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {listaCarritos.length > 0 ? (
            listaCarritos.map((c) => (
              <tr key={c._id}>
                <td>{c.usuario?.nombre || c.usuario?.correo}</td>
                <td>
                  {(c.productos ?? []).map((p, index) => (
                    <div key={`${p.producto?._id}-${index}`}>
                      {p.producto?.nombre ?? "Producto"} x {p.cantidad}
                    </div>
                  ))}
                </td>
                <td>${c.total ?? 0}</td>
                <td
                  className="danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(c._id)}
                >
                  eliminar
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay carritos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableCarrito;

