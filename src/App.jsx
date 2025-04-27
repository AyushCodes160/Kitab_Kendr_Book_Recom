import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import MobileNav from './components/MobileNav/MobileNav'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import BookDetailPage from './pages/BookDetailPage'
import ReaderPage from './pages/ReaderPage'
import FavoritesPage from './pages/FavoritesPage'
import { FavoritesProvider } from './context/FavoritesContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { ThemeProvider } from './context/ThemeContext'
import useMediaQuery from './hooks/useMediaQuery'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true)
    } else {
      setIsSidebarOpen(false)
    }
  }, [isDesktop])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RecentlyViewedProvider>
          <div className="app">
            <Header toggleSidebar={toggleSidebar} />
            
            <div className="content-container">
              {(isSidebarOpen || isDesktop) && <Sidebar />}
              
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/book/:bookId" element={<BookDetailPage />} />
                  <Route path="/read/:bookId" element={<ReaderPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
              </main>
            </div>
            
            {!isDesktop && <MobileNav />}
          </div>
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App