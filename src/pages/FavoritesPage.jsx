import { useContext } from 'react'
import BookGrid from '../components/BookGrid/BookGrid'
import { FavoritesContext } from '../context/FavoritesContext'
import './FavoritesPage.css'

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext)
  
  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any books to your favorites yet.</p>
          <p>Browse books and click the heart icon to add them here.</p>
        </div>
      ) : (
        <BookGrid books={favorites} />
      )}
    </div>
  )
}

export default FavoritesPage