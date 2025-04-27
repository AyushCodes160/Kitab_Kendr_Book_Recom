import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaSearch, FaHeart, FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../../context/ThemeContext'
import './Header.css'

function Header({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="header">
      <div className="container header-container">
        <button 
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <FaBars />
        </button>
        
        <Link to="/" className="logo">
          <h1>KitabKendr</h1>
        </Link>
        
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </form>
        
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/favorites" className="favorites-link">
            <FaHeart />
            <span className="visually-hidden">Favorites</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header