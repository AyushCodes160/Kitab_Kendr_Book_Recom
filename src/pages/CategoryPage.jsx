import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BookGrid from '../components/BookGrid/BookGrid'
import { fetchBooks } from '../data/books'
import { categories } from '../data/categories'
import './CategoryPage.css'

function CategoryPage() {
  const { categoryId } = useParams()
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const category = categories.find(cat => cat.id === categoryId)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const fetchedBooks = await fetchBooks(`subject:${categoryId}`)
        setBooks(fetchedBooks)
      } catch (error) {
        console.error('Error loading books:', error)
      }
      setIsLoading(false)
    }

    loadBooks()
  }, [categoryId])

  if (!category) {
    return <div>Category not found</div>
  }

  if (isLoading) {
    return (
      <div className="category-page">
        <h1>Loading {category.name} books...</h1>
      </div>
    )
  }

  return (
    <div className="category-page">
      <h1>{category.name} Books</h1>
      <p className="category-description">{category.description}</p>
      
      <BookGrid books={books} />
    </div>
  )
}

export default CategoryPage