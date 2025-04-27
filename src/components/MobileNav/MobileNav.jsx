import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch, FaHeart, FaBook } from 'react-icons/fa'
import './MobileNav.css'

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/" className="nav-item">
        <FaHome />
        <span>Home</span>
      </NavLink>
      
      <NavLink to="/category/fiction" className="nav-item">
        <FaBook />
        <span>Browse</span>
      </NavLink>
      
      <NavLink to="/?search=true" className="nav-item">
        <FaSearch />
        <span>Search</span>
      </NavLink>
      
      <NavLink to="/favorites" className="nav-item">
        <FaHeart />
        <span>Favorites</span>
      </NavLink>
    </nav>
  )
}

export default MobileNav