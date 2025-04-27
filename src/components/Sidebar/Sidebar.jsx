import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaHeart, FaBookOpen } from 'react-icons/fa'
import { categories } from '../../data/categories'
import './Sidebar.css'

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  
  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-link">
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="nav-link">
              <FaHeart className="nav-icon" />
              <span className="nav-text">Favorites</span>
            </NavLink>
          </li>
          
          <li className="nav-divider">
            <span>Categories</span>
          </li>
          
          {categories.map(category => (
            <li key={category.id}>
              <NavLink 
                to={`/category/${category.id}`} 
                className="nav-link"
              >
                <FaBookOpen className="nav-icon" />
                <span className="nav-text">{category.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar