import { createContext, useEffect, useState } from "react"
import FormComponent from "../../components/FormComponent"


export const CheckoutContext = createContext()

// =====================================================
// READ IMPORTANT
// this component will be responsible for communicating with the backend and 
// preservation of data throughout the multistep form
// =====================================================

const CheckOut = () => {

  const testVar = 'It is working'

  const [checkOutFormData, setCheckOutFormData] = useState(null)

  // different from booksInCart array state since this will be utilized by a different model in the backend, 
  // that includes the rent or purchase status
  const [checkOutBooks, setCheckOutBooks] = useState(() =>
    sessionStorage.getItem('recorded_status') ? JSON.parse(sessionStorage.getItem('recorded_status')) : []
  )

  console.log(checkOutBooks)

  // const stripe = Stripe('pk_test_51LHqMdDenqsfOr1HJvOFflHXQQExeSgmjXHiIY6QJURHpRzT6XtFU95MZgaaL6qj3NCWi6Gnqrgcwgv9YS1gQY7Q00IPUQ0Jch')

  let CheckoutData = {
    testVar: testVar,
    checkOutBooks: checkOutBooks,
    setCheckOutBooks: setCheckOutBooks,
    checkOutFormData: checkOutFormData,
    setCheckOutFormData: setCheckOutFormData,
  }

  return (
    <CheckoutContext.Provider value={CheckoutData}>
      <FormComponent />
    </CheckoutContext.Provider>
  )
}

export default CheckOut