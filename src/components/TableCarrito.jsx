import { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";

function TableCarrito() {
  const { carritos, getCarritos, deleteCarrito } = useCarrito();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCarritos();
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este carrito?")) {
      await deleteCarrito(id);
    }
  };

  const listaCarritos = Array.isArray(carritos) ? carritos : [];

  const getUsuarioid = (carrito) => {
    const usuario = carrito.usuario;
    
    if (!usuario) return "-";
    
    // Si usuario es un objeto (ya populado)
    if (typeof usuario === 'object') {
      return usuario._id || "-";
    }
    
    // Si usuario es un string (ObjectId sin popular)
    if (typeof usuario === 'string') {
      return usuario;
    }
    
    return "-";
  };

  const getUsuarioNombre = (carrito) => {
    const usuario = carrito.usuario;
    
    if (!usuario) return "Sin asignar";
    
    // Si usuario es un objeto (ya populado)
    if (typeof usuario === 'object') {
      const nombre = usuario.nombre || usuario.correo || "";
      return nombre || "Sin nombre";
    }
    
    // Si usuario es un string (ObjectId sin popular)
    if (typeof usuario === 'string') {
      return "-";
    }
    
    return "Sin asignar";
  };

  return (
    <div className="recent_order">
      <h2>Carritos</h2>
      {loading ? (
        <p>Cargando carritos...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>id usuario</th>
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
                  <td>{getUsuarioid(c)}</td>
                  <td>{getUsuarioNombre(c)}</td>
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
                <td colSpan="5">No hay carritos</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCarrito;

