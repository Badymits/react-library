import { createContext, useEffect, useState } from "react"
import FormComponent from "../../components/FormComponent"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";



// eslint-disable-next-line no-undef
const stripePromise = loadStripe(`${import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)
console.log(stripePromise)
export const CheckoutContext = createContext()

// =====================================================
// READ IMPORTANT
// this component will be responsible for communicating with the backend and 
// preservation of data throughout the multistep form
// =====================================================

const CheckOut = () => {
  const testVar = 'It is working'

  const [checkOutFormData, setCheckOutFormData] = useState(null)

  const [amount, setAmount] = useState(0)


  const [clientID, setClientID] = useState('')
  const [clientSecretOne, setClientSecretOne] = useState('')

  // if set to true, will create a payment intent in the backend
  const [paymentIntent, setPaymentIntent] = useState(() => true)

  // different from booksInCart array state since this will be utilized by a different model in the backend, 
  // that includes the rent or purchase status
  const [checkOutBooks, setCheckOutBooks] = useState(() =>
    sessionStorage.getItem('recorded_status') ? JSON.parse(sessionStorage.getItem('recorded_status')) : []
  )

  console.log(checkOutBooks)

  useEffect(() => {
    const createPaymentIntent = async () => {
      const data = await axios.get('http://127.0.0.1:8000/payments/create-payment-intent/')
      return data
    }
     
    if (paymentIntent === true){
      createPaymentIntent().then((res) => {
        console.log(res.data)
        setClientID(res.data.client_secret.id)
        setClientSecretOne(res.data.client_secret.client_secret)
      })
    }
    
  }, [paymentIntent, setClientID, setClientSecretOne])


  console.log('potangina ', clientID)
  console.log('potanginatalaga ',clientSecretOne)
  
  let CheckoutData = {
    testVar: testVar,
    checkOutBooks: checkOutBooks,
    setCheckOutBooks: setCheckOutBooks,
    checkOutFormData: checkOutFormData,
    setCheckOutFormData: setCheckOutFormData,
    stripePromise: stripePromise,
    setPaymentIntent: setPaymentIntent,
    amount: amount,
    setAmount: setAmount,
    clientSecretOne: clientSecretOne,
    
  }

  return (
    <CheckoutContext.Provider value={CheckoutData}>
      
      <Elements
        options={clientSecretOne}
        stripe={stripePromise}
      >
        <FormComponent />
      </Elements>
      
    </CheckoutContext.Provider>
  )
}

export default CheckOut