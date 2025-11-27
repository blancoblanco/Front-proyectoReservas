import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableProducts from "../components/TableProducts";
import TableCategorias from "../components/TableCategorias";
import { useAuth } from "../context/AuthContext";
import "../css/Dasboard.css";
import TableCarrito from "../components/TableCarrito";


function Dashbord() {
  const { user, signout } = useAuth(); // <-- agregamos signout
  const [nombre, setNombre] = useState("");
  const location = useLocation(); // obtenemos la ruta actual
  const navigate = useNavigate(); // para redirigir

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || user.correo); // usa 'nombre' o 'correo'
    }
  }, [user]);

  const handleLogout = async () => {
    await signout();
    navigate("/login"); // redirige al login
  };

  return (
    <div className="container">
      <aside>
        <div className="sidebar">
          <a
            className={location.pathname === "/dashbord" ? "active" : ""}
            href="/dashbord"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <h3>Panel</h3>
          </a>
          <a href="/dashbord">
            <span className="material-symbols-outlined">receipt_long</span>
            <h3>Productos</h3>
          </a>
          <a
            className={location.pathname === "/categorias" ? "active" : ""}
            href="/categorias"
          >
            <span className="material-symbols-outlined">category</span>
            <h3>Categorías</h3>
          </a>
          <a href="/carrito">
            <span className="material-symbols-outlined">shopping_cart</span>
            <h3>Carrito</h3>
          </a>
          <a href="/add-producto">
            <span className="material-symbols-outlined">add</span>
            <h3>Agregar Producto</h3>
          </a>
          <a href="/add-categoria">
            <span className="material-symbols-outlined">add</span>
            <h3>Agregar Categoria</h3>
          </a>
          <a href="">
            <span className="material-symbols-outlined">settings</span>
            <h3>Configuración</h3>
          </a>
          {/* Botón cerrar sesión */}
          <a
            href="/logout"
            onClick={async (e) => {
              e.preventDefault(); // evita recargar
              await signout();
              navigate("/login"); // redirige al login
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            <h3>Cerrar sesión</h3>
          </a>
        </div>
      </aside>

      <main>
        <h2>Hola {nombre}</h2>

        {/* Renderizado condicional según la ruta */}
        {location.pathname === "/dashbord" && <TableProducts />}
        {location.pathname === "/categorias" && <TableCategorias />}
        {location.pathname === "/carrito" && <TableCarrito />}
      </main>
    </div>
  );
}

export default Dashbord;
