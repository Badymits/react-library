import { useContext } from "react"
import { CheckoutContext } from "../pages/pagetab/CheckOut"

const ThirdPagePH = () => {

  let { address, checkOutBooks, amount } = useContext(CheckoutContext)

  return (
    <div>
      <h1 className="text-4xl text-green-200">Order Complete!!</h1>
      <p>User Address: {JSON.stringify(address.full_address).split(null).join('')}</p>
      <div className="w-full  mb-10">
            <h1 className="text-3xl text-[#4caa73]">Cart Total</h1>
            <table className="w-full h-[200px] text-center">
              <tbody>
                <tr className="w-[50%]">
                  <td>Book Title</td>
                  <td>Book Status</td>
                  <td>Book Price</td>
                </tr>
                  {checkOutBooks.map((book) => (
                    <tr key={book.book_id} >
                      <td>{book.book_title}</td>
                      {book.book_output_status === 'Rent' ? 
                        <td className="bg-yellow-300">{book.book_output_status}</td> 
                        :
                        <td className="bg-green-300">{book.book_output_status}</td>
                      }                   
                      <td>{book.book_price}</td>
                    </tr>
                  ))}
                <tr className="text-center">
                  <td></td>
                  <td className="text-green-400 text-3xl">Price: </td>
                  <td>{amount}</td>
                </tr>
              </tbody>
              
            </table>
          </div>
    </div>
  )
}

export default ThirdPagePH