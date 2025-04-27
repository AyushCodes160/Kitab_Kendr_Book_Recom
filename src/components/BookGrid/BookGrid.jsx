import BookCard from '../BookCard/BookCard'
import './BookGrid.css'

function BookGrid({ books, title }) {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        <h2>No books found</h2>
        <p>Try adjusting your search or browse through categories.</p>
      </div>
    )
  }
  
  return (
    <div className="book-grid-container">
      {title && <h2 className="grid-title">{title}</h2>}
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-grid-item">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookGrid