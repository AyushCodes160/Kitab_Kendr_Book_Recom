import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FavoritesContext } from '../../context/FavoritesContext'
import './BookCard.css'

function BookCard({ book }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const isFavorite = favorites.some(fav => fav.id === book.id)
  
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(book)
  }
  
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <div className="book-cover-container">
          <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
          <button 
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <div className="book-category">{book.categories[0]}</div>
        </div>
      </Link>
    </div>
  )
}

export default BookCard