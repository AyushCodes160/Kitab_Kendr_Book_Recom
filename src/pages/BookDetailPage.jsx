import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaArrowLeft, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa'
import { fetchBookById } from '../data/books'
import { FavoritesContext } from '../context/FavoritesContext'
import { RecentlyViewedContext } from '../context/RecentlyViewedContext'
import './BookDetailPage.css'

function BookDetailPage() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const { addToRecentlyViewed } = useContext(RecentlyViewedContext)
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadBook = async () => {
      try {
        const bookData = await fetchBookById(bookId)
        setBook(bookData)
        if (bookData) {
          addToRecentlyViewed(bookData)
        }
      } catch (error) {
        console.error('Error loading book:', error)
      }
      setIsLoading(false)
    }
    
    loadBook()
  }, [bookId, addToRecentlyViewed])
  
  if (isLoading) {
    return (
      <div className="book-detail-page">
        <h1>Loading book details...</h1>
      </div>
    )
  }
  
  if (!book) {
    return (
      <div className="not-found">
        <h1>Book Not Found</h1>
        <p>Sorry, we couldn't find the book you're looking for.</p>
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    )
  }
  
  const isFavorite = favorites.some(fav => fav.id === book.id)
  
  const handleGoBack = () => {
    navigate(-1)
  }
  
  return (
    <div className="book-detail-page">
      <button onClick={handleGoBack} className="back-button">
        <FaArrowLeft /> Back
      </button>
      
      <div className="book-detail-content">
        <div className="book-cover-large">
          <img src={book.coverImage} alt={`${book.title} cover`} />
        </div>
        
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <p className="book-author">By {book.author}</p>
          
          <div className="book-categories">
            {book.categories.map(category => (
              <Link 
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="category-tag"
              >
                {category}
              </Link>
            ))}
          </div>
          
          <div className="book-actions">
            {book.previewLink ? (
              <a 
                href={book.previewLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-button"
              >
                <FaBookOpen /> Read Preview <FaExternalLinkAlt />
              </a>
            ) : (
              <button className="read-button" disabled>
                <FaBookOpen /> Preview Not Available
              </button>
            )}
            
            <button 
              className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
              onClick={() => toggleFavorite(book)}
            >
              {isFavorite ? (
                <>
                  <FaHeart /> Remove from Favorites
                </>
              ) : (
                <>
                  <FaRegHeart /> Add to Favorites
                </>
              )}
            </button>
          </div>
          
          <div className="book-description">
            <h2>About the Book</h2>
            <p>{book.description}</p>
          </div>
          
          <div className="book-meta">
            <div className="meta-item">
              <span className="meta-label">Pages:</span>
              <span className="meta-value">{book.totalPages || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Published:</span>
              <span className="meta-value">{book.publishYear || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Language:</span>
              <span className="meta-value">{book.language.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage