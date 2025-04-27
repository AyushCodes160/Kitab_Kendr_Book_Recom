import { createContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('bookshelf-favorites')
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error)
        localStorage.removeItem('bookshelf-favorites')
      }
    }
  }, [])
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookshelf-favorites', JSON.stringify(favorites))
  }, [favorites])
  
  const toggleFavorite = (book) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === book.id)
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== book.id)
      } else {
        return [...prevFavorites, book]
      }
    })
  }
  
  const isFavorite = (bookId) => {
    return favorites.some(book => book.id === bookId)
  }
  
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}