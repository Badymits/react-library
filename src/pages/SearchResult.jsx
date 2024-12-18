import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const SearchResult = () => {

  let { searchResults, setBooksInCart, booksInCart } = useContext(AuthContext)
  const keyword = sessionStorage.getItem('keyword')

  const [books, setBooks] = useState(() => [])

  //when searchresults changes in the authcontext, set the books state to the items in the session storage
  useEffect(() => {
    setBooks(JSON.parse(sessionStorage.getItem('books')))
  }, [searchResults])


  const handleAddToCartBtn = (book) => {
    // we dont want to add the book in the cart twice... or else
    if (booksInCart.includes(book)){
      alert('Item is already in cart!')
    } else {
      setBooksInCart( prevState => 
        [...prevState, book]
      )
      alert(`Added "${book.title}" to cart!!!`)
    }
  }

  // whenever the booksIncart changes or is appended, make sure to add it in local storage so it wont be gone on page refresh
  useEffect(() => {
    localStorage.setItem('cart_books', JSON.stringify(booksInCart))
  }, [booksInCart])

  return (
        <div>
          <p className='font-bold'>Search Results for: {keyword}</p>
          <div>
            {books.map((book) => (
              <div key={book.id} className='h-[350px]  hover:bg-gray-200 hover:border-2 duration-100 flex items-center px-2 my-10 gap-4 cursor-pointer' >
                <div className='flex justify-center'>
                  <img src={book.book_image} alt="" className='object-contain max-h-[240px] max-w-[240px] '/>
                </div>
                <div className='text-lg my-2'>
                  <p className='text-xl font-bold'>{book.title}</p>
                  <p className='font-light'>{book.author.name}</p>
                  <p className='text-gray-800 font-light text-sm'>{book.genre[0].name}</p>
                  <p>{ book.summary }</p>
                  <button className=' w-[40%] bg-[#6AB187] py-3 rounded-full mt-10 text-white text-2xl
                    hover:bg-[#4caa73] duration-200'
                    onClick={() => handleAddToCartBtn(book)}
                  >
                    Add to Cart
                    </button>
                </div>
                
              </div>
              
            ))}
          </div>
        </div>
  )
}

export default SearchResult