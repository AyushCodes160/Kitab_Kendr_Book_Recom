import { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookGrid from '../components/BookGrid/BookGrid'
import CategoryFilter from '../components/CategoryFilter/CategoryFilter'
import { fetchBooks } from '../data/books'
import { RecentlyViewedContext } from '../context/RecentlyViewedContext'
import './HomePage.css'

function HomePage() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [books, setBooks] = useState([])
  const [popularBooks, setPopularBooks] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { recentlyViewed } = useContext(RecentlyViewedContext)

  // Fetch books based on search query or category
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        let query = searchQuery
        if (selectedCategory) {
          query = `subject:${selectedCategory}`
        }
        const fetchedBooks = await fetchBooks(query)
        setBooks(fetchedBooks)
      } catch (error) {
        console.error('Error loading books:', error)
      }
      setIsLoading(false)
    }

    loadBooks()
  }, [searchQuery, selectedCategory])

  // Fetch popular books and new releases on initial load
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const [popular, recent] = await Promise.all([
          fetchBooks('orderBy=relevance'),
          fetchBooks('orderBy=newest')
        ])
        setPopularBooks(popular.slice(0, 5))
        setNewReleases(recent.slice(0, 5))
      } catch (error) {
        console.error('Error loading featured books:', error)
      }
    }

    if (!searchQuery && !selectedCategory) {
      loadFeaturedBooks()
    }
  }, [])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  if (isLoading) {
    return (
      <div className="home-page">
        <h1>Loading books...</h1>
      </div>
    )
  }

  return (
    <div className="home-page">
      {searchQuery ? (
        <>
          <h1>Search Results: {searchQuery}</h1>
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onChange={handleCategoryChange}
          />
          <BookGrid books={books} />
        </>
      ) : (
        <>
          <h1>Discover Books</h1>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onChange={handleCategoryChange}
          />
          
          {recentlyViewed.length > 0 && (
            <BookGrid books={recentlyViewed} title="Recently Viewed" />
          )}
          
          {selectedCategory ? (
            <BookGrid books={books} />
          ) : (
            <>
              <BookGrid books={popularBooks} title="Popular Books" />
              <BookGrid books={newReleases} title="New Releases" />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage