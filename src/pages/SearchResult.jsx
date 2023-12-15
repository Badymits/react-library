import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SearchResult = () => {
  
    let { keyword, searchResults } = useContext(AuthContext)

  return (
     
        <div className='h-[100vh]'>
          <p className='font-bold'>Search Results for: {keyword}</p>
          {/* display all books related to keyword here... */}
          {searchResults.map((book) => (
            <div key={book.id}>
              <p>{book.title}</p>
            </div>
          ))}
        </div>
  )
}

export default SearchResult