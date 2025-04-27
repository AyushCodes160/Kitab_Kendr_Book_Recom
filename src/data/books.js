// Function to fetch books from the Google Books API
export const fetchBooks = async (query = '') => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query || 'subject:fiction')}&maxResults=12`
    );
    const data = await response.json();
    
    if (!data.items) return [];
    
    return data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author',
      description: book.volumeInfo.description || 'No description available',
      coverImage: book.volumeInfo.imageLinks?.thumbnail || 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      categories: book.volumeInfo.categories || ['Uncategorized'],
      publishYear: book.volumeInfo.publishedDate ? parseInt(book.volumeInfo.publishedDate) : null,
      language: book.volumeInfo.language || 'en',
      totalPages: book.volumeInfo.pageCount || 0,
      content: book.volumeInfo.description || 'Content not available',
      previewLink: book.volumeInfo.previewLink || null
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

// Function to fetch a single book by ID
export const fetchBookById = async (bookId) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    const book = await response.json();
    
    if (book.error) {
      return null;
    }
    
    return {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author',
      description: book.volumeInfo.description || 'No description available',
      coverImage: book.volumeInfo.imageLinks?.thumbnail || 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      categories: book.volumeInfo.categories || ['Uncategorized'],
      publishYear: book.volumeInfo.publishedDate ? parseInt(book.volumeInfo.publishedDate) : null,
      language: book.volumeInfo.language || 'en',
      totalPages: book.volumeInfo.pageCount || 0,
      content: book.volumeInfo.description || 'Content not available',
      previewLink: book.volumeInfo.previewLink || null
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
};

// Initial books data (will be replaced by API data)
export const books = [];