import { categories } from '../../data/categories'
import './CategoryFilter.css'

function CategoryFilter({ selectedCategory, onChange }) {
  return (
    <div className="category-filter">
      <button 
        className={`category-button ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter