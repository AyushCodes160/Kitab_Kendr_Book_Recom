import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { books } from '../data/books'
import BookReader from '../components/BookReader/BookReader'
import { FavoritesContext } from '../context/FavoritesContext'
import { RecentlyViewedContext } from '../context/RecentlyViewedContext'

function ReaderPage() {
  const { bookId } = useParams()
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const { addToRecentlyViewed } = useContext(RecentlyViewedContext)
  
  const book = books.find(b => b.id === bookId)
  
  if (!book) {
    return <div>Book not found</div>
  }
  
  // Add to recently viewed
  addToRecentlyViewed(book)
  
  const isFavorite = favorites.some(fav => fav.id === book.id)
  
  return (
    <BookReader 
      book={book} 
      isFavorite={isFavorite} 
      onToggleFavorite={toggleFavorite}
    />
  )
}

export default ReaderPage