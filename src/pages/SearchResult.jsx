import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const SearchResult = () => {

  let { searchResults } = useContext(AuthContext)
  const keyword = sessionStorage.getItem('keyword')

  const [books, setBooks] = useState(() => [])

  //when search results changes, set the books state to the items in the session storage
  useEffect(() => {
    setBooks(JSON.parse(sessionStorage.getItem('books')))
  }, [searchResults])

  return (
        <div>
          <p className='font-bold'>Search Results for: {keyword}</p>
          <div>
            {books.map((book) => (
              <div key={book.id} className='h-[200px]'>
                <img src={book.book_image} alt="" className='h-[100px] w-[100px]'/>
                <p>{book.title}</p>
                <p>{book.author.name}</p>
                <p>{book.genre[0].name}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default SearchResult