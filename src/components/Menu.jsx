import '../CSS/Menu.css'
import { Link } from 'react-router-dom'

function Menu() {
  return (  
    <>
      <header className='menu-header'>
        <Link to="/" className="menu-logo">Tienda</Link>
        <nav className='menu-navbar'>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/categorias">Categorias</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    </>
  )
}

export default Menu