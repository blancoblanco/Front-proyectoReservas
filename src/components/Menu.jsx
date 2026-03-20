import '../CSS/Menu.css'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <>
      <header className='menu-header'>
        <Link to="/" className="menu-logo">Tienda</Link>
        <nav className='menu-navbar'>
          <span className="material-symbols-outlined"> shopping_cart</span>
          <Link to="/productos">Productos</Link>
          <Link to="/dashbord">Menu</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    </>
  )
}

export default Menu