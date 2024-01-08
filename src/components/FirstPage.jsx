/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"

import { AuthContext } from "../context/AuthContext"

// the first part is where the user wants to rent the book or purchase the book
const FirstPage = ({ checkOutBooks, setCheckOutBooks }) => {
  let { booksInCart, setBooksInCart } = useContext(AuthContext)

  const handleBookCheckOutStatus = (status, book) => {

    // check first if it already exists in the state array
    if (checkOutBooks.find(item => item.book_title === book.title)){

      // getting the index of the book in state array
      let bookIndex = checkOutBooks.findIndex(item => item.book_title === book.title)
      console.log(bookIndex)

      // copy the state and place in new variable
      let newBookState = [...checkOutBooks]

      // by using the index above, we update the book based on its index and change its output status
      newBookState[bookIndex] = {
        ...checkOutBooks[bookIndex], book_output_status: status
      }

      // set the state along with the updated object
      setCheckOutBooks( newBookState )

      
    } 

    // if it doesn't exist proceed to update obj state array
    else {
      setCheckOutBooks( prevState =>
        [ 
          ...[{
            book_id: book.id,
            book_title: book.title, 
            book_output_status: status, 
          }],
          ...prevState
        ]
      )
    }
    alert('Recorded')
  }

  // when the checkOutBooks state changes, set the state to the session storage to retain data
  useEffect(() => {
    sessionStorage.setItem('recorded_status', JSON.stringify(checkOutBooks))
  }, [checkOutBooks])


  const handleRemoveItem = (book) => {

    // need user confirmation before we remove the item from checkoutbooks state array
    // first check if it is in array already. For the book to be in the array, it has to be recorded as 'rent' or 'purchase first'
    if (checkOutBooks.find(item => item.book_title === book.title)){
      alert('are you sure?')
    }

    alert(`'${book.title}' removed!!!`)
    
    //checking if item exists in session storage
    if (sessionStorage.getItem('recorded_status')){

      // retrieve the array of objects from storage
      let recordedStatus = JSON.parse(sessionStorage.getItem('recorded_status'))
      
      // filter the books excluding the item that was removed via ID
      let filteredBooks = recordedStatus.filter(item => item.book_id !== book.id)

      // set the session storage with the removed book
      sessionStorage.setItem('recorded_status', JSON.stringify(filteredBooks))

      // set the state to its new array of recorded books
      setCheckOutBooks(filteredBooks)
    }
    
    // removing the book from the booksInCart state
    let filteredArray = booksInCart.filter(item => item !== book)
    setBooksInCart(filteredArray)
  }


  return (
    <div>
      <div className="pt-10">
          {booksInCart.map((book) => (
              <div key={book.id} className="flex items-center justify-between gap-2 py-2 px-3 h-[230px]">

                  <div className="text-center bg-blue-400 w-[120px] flex justify-center">
                    <img src={book.book_image} alt={book.title} className="object-contain max-h-[200px] max-w-[200px]"/>
                  </div>
                  
                  <div className="px-2 w-[60%] h-[120px]  text-2xl ">
                      {
                        (checkOutBooks.find(item => item.book_title === book.title)) && 
                        <p className={`text-black text-sm w-[150px] text-center mb-4 font-bold
                          ${checkOutBooks.find(item => item.book_title === book.title).book_output_status  === 'Rent' ? 
                          "bg-yellow-200 " : 
                          "bg-green-300 "}
                          `
                        }>
                          Marked as {(checkOutBooks.find(item => item.book_title === book.title).book_output_status )}
                        </p>
                      }

                      <p className="font-light">{book.title}</p>
                      <p className="font-thin">{book.author.name}</p>
                      <p className="pt-4 text-sm font-bold">Rent Price: Php {book.rent_price}</p>
                      <p className="text-sm font-bold">Purchase Price: Php {book.purchase_price}</p>
                  </div>

                  <div className="flex flex-col gap-4 ">
                    <button 
                      onClick={() => handleBookCheckOutStatus('Rent', book)}
                      className="bg-yellow-200 hover:bg-yellow-300 duration-200 h-[40px] w-[120px] rounded-lg border-2 border-blue-200"
                    >
                      Rent
                    </button>

                    <button 
                      onClick={() => handleBookCheckOutStatus('Purchase', book)}
                      className="bg-green-300 hover:bg-green-400 duration-200 h-[40px] w-[120px] rounded-lg border-2 "
                    >
                      Purchase
                    </button>

                  <button className="bg-red-500 hover:bg-red-400 duration-200 text-white h-[40px] w-[120px] rounded-lg" onClick={() => handleRemoveItem(book)}>Remove Book</button>
                  </div>
              
              </div>
          ))}
          {/* <button className="bg-[#6AB187] w-[20%] h-[50px] rounded-lg text-white hover:bg-[#4caa73] duration-100 my-10" type="submit">Checkout</button> */}
      </div>
    </div>
  )
}

export default FirstPage