import { createContext, useState, useEffect } from 'react'

export const RecentlyViewedContext = createContext()

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([])
  
  // Load recently viewed books from localStorage on component mount
  useEffect(() => {
    const storedRecent = localStorage.getItem('bookshelf-recently-viewed')
    if (storedRecent) {
      try {
        setRecentlyViewed(JSON.parse(storedRecent))
      } catch (error) {
        console.error('Failed to parse recently viewed from localStorage', error)
        localStorage.removeItem('bookshelf-recently-viewed')
      }
    }
  }, [])
  
  // Save recently viewed books to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookshelf-recently-viewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])
  
  const addToRecentlyViewed = (book) => {
    setRecentlyViewed(prevRecent => {
      // Remove the book if it's already in the list
      const filteredList = prevRecent.filter(item => item.id !== book.id)
      
      // Add the book to the beginning of the list
      const newList = [book, ...filteredList]
      
      // Keep only the 10 most recent books
      return newList.slice(0, 10)
    })
  }
  
  return (
    <RecentlyViewedContext.Provider value={{ 
      recentlyViewed, 
      addToRecentlyViewed 
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}