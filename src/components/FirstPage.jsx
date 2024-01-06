import { useContext } from "react"

import { AuthContext } from "../context/AuthContext"

const FirstPage = () => {
  let { booksInCart, setBooksInCart } = useContext(AuthContext)


  console.log(booksInCart)

  const placeholderFormSubmit = (e) => {
    e.preventDefault();
    console.log('Books to be checked out: ', booksInCart)
    alert('Thank you come again!!')
  }

  const handleRemoveItem = (book) => {
    alert(`'${book.title}' removed!!!`)
    let filteredArray = booksInCart.filter(item => item !== book)
    setBooksInCart(filteredArray)
  }
  return (
    <div>
        <div className="pt-10">
            <form action="" onSubmit={placeholderFormSubmit}>
                {/* 
                    MULTI-STEP FORM:

                    1st step === Book Cart Confirmation (Rent Book, Purchase Book or Remove Book from Cart) 
                    2nd step === Input Address and Payment details
                    3rd step === Order Confirmation and Receipt
                    
                */}
                
                {booksInCart.map((book) => (
                    <div key={book.id} className="flex items-center justify-between gap-2 py-2 px-3 h-[230px]">
                        <div className="text-center bg-blue-400 w-[120px] flex justify-center">
                        <img src={book.book_image} alt={book.title} className="object-contain max-h-[200px] max-w-[200px]"/>
                        </div>
                        
                        <div className="px-2 w-[60%] h-[120px]  text-2xl ">
                            <p className="font-light">{book.title}</p>
                            <p className="font-thin">{book.author.name}</p>
                            <p className="pt-4 text-sm font-bold">Rent Price: Php {book.rent_price}</p>
                            <p className="text-sm font-bold">Purchase Price: Php {book.purchase_price}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                        <button>Rent</button>
                        <button>Purchase</button>
                        <button className="bg-red-500 hover:bg-red-400 duration-200 text-white h-[40px] w-[120px] rounded-lg" onClick={() => handleRemoveItem(book)}>Remove Book</button>
                        </div>
                    
                    </div>
                ))}
                {/* <button className="bg-[#6AB187] w-[20%] h-[50px] rounded-lg text-white hover:bg-[#4caa73] duration-100 my-10" type="submit">Checkout</button> */}
            </form>
            
        </div>
        
    </div>
  )
}

export default FirstPage