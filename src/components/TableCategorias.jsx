import { useEffect } from "react";
import { useCategoria } from "../context/CategoriaContext";
import { Link } from "react-router-dom";

function TableCategorias() {
  const { getCategorias, categorias, deleteCategoria } = useCategoria();

  useEffect(() => {
    getCategorias(); // cargar al montar
  }, []);

  const handleDelete = async (id, nombre) => {
    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar la categoría "${nombre}"?`
    );
    if (confirmDelete) {
      try {
        await deleteCategoria(id); // elimina en backend
        // actualizar listado
        getCategorias();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
      }
    }
  };

  return (
    <div className="recent_order">
      <h2>Categorías</h2>

      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>editar</th>
            <th>eliminar</th>
          </tr>
        </thead>

        <tbody>
          {categorias.length > 0 ? (
            categorias.map((c) => (
              <tr key={c._id}>
                <td>{c.nombre}</td>

                {/* BOTÓN EDITAR */}
                <td style={{ cursor: "pointer" }}>
                  <Link to={`/categoria/${c._id}`} className="warning">
                    editar
                  </Link>
                </td>

                {/* BOTÓN ELIMINAR */}
                <td
                  className="danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(c._id, c.nombre)}
                >
                  eliminar
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay categorías</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableCategorias;
