import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa'
import './BookReader.css'

function BookReader({ book, isFavorite, onToggleFavorite }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const navigate = useNavigate()
  
  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (isControlsVisible) {
      const timer = setTimeout(() => {
        setIsControlsVisible(false)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isControlsVisible])
  
  // Show controls on mouse movement
  const handleMouseMove = () => {
    setIsControlsVisible(true)
  }
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  
  const handleNextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize)
  }
  
  const goBack = () => {
    navigate(-1)
  }
  
  // Simulate book content - in a real app, this would come from the API
  const getPageContent = () => {
    return book.content || "This is a sample page content. In a real app, this would be the actual book content."
  }
  
  return (
    <div className="book-reader" onMouseMove={handleMouseMove}>
      {isControlsVisible && (
        <div className="reader-header">
          <button 
            className="back-button" 
            onClick={goBack}
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>
          
          <div className="reader-title">{book.title}</div>
          
          <button 
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            onClick={() => onToggleFavorite(book)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      )}
      
      <div className="reader-content" style={{ fontSize: `${fontSize}px` }}>
        {getPageContent()}
      </div>
      
      {isControlsVisible && (
        <div className="reader-footer">
          <div className="page-navigation">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="page-button"
            >
              Previous
            </button>
            
            <div className="page-indicator">
              Page {currentPage} of {book.totalPages || 1}
            </div>
            
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === (book.totalPages || 1)}
              className="page-button"
            >
              Next
            </button>
          </div>
          
          <div className="font-controls">
            <button 
              onClick={() => handleFontSizeChange(Math.max(12, fontSize - 2))}
              className="font-button"
              aria-label="Decrease font size"
            >
              A-
            </button>
            
            <button 
              onClick={() => handleFontSizeChange(Math.min(24, fontSize + 2))}
              className="font-button"
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookReader