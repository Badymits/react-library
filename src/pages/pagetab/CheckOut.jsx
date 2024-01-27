import { createContext, useContext, useEffect, useState } from "react"
import FormComponent from "../../components/FormComponent"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


// eslint-disable-next-line no-undef
export const CheckoutContext = createContext()

// =====================================================
// READ IMPORTANT
// this component will be responsible for communicating with the backend and 
// preservation of data throughout the multistep form
// =====================================================

const CheckOut = () => {

  let { user } = useContext(AuthContext)
  let { removedItemArray, setRemovedItemArray } = useContext(AuthContext)

  const [checkOutFormData, setCheckOutFormData] = useState(null)

  // used to pass to the backend
  const [amount, setAmount] = useState(0)

  // storing stripe related values
  const [clientID, setClientID] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [stripePromise, setstripePromise] = useState()
  const [submitPayment, setSubmitPayment] = useState(false)
  const [checkoutSession, setCheckOutSession] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [address, setAddress] = useState()

  // if set to true, will create a payment intent in the backend
  const [paymentIntent, setPaymentIntent] = useState(() => true)

  const [paymentMode, setPaymentMode] = useState('') // to determine which element should be rendered 

  // different from booksInCart array state since this will be utilized by a different model in the backend, 
  // that includes the rent or purchase status
  const [checkOutBooks, setCheckOutBooks] = useState(() =>
    sessionStorage.getItem('recorded_status') ? JSON.parse(sessionStorage.getItem('recorded_status')) : []
  )

  console.log(checkOutBooks)

  // if (address)
  // {
  //   console.log(`address is: ${JSON.stringify(address).split(null).join('')}`)
  // }

  useEffect(() => {
    //console.log(`current amount in cart: ${(amount .toFixed(2))} !!!!`)
    const createPaymentIntent = async () => {
      if (amount !== 0 ){
        try{
          const data = await axios.get('http://127.0.0.1:8000/payments/create-payment-intent/', {
            params: {
              'total_amount': Math.round(amount*100)
            }
           })
          console.log(data)
          return data
        } catch (error) {
          console.error(`Something wrong happpened: ${error}`)
        }
      }
    }

    console.log(`the payment intent: ${paymentIntent}`)
    if ((checkOutBooks) || window.PerformanceNavigationTiming.type === "reload"){
      createPaymentIntent().then((res) => {
        setIsLoading(true)
        console.log(res.data)

        setClientID(res.data.client_secret.id)
        setClientSecret(res.data.client_secret.client_secret)

      }).catch((err) => {
        console.error(err)
      }).finally(function () {
        setIsLoading(false)
      })
    }
    
  }, [paymentIntent, setClientID, setClientSecret, checkOutBooks, amount])

  // when the removedItemarray makes changes, change state to the session storage array
  useEffect(() => {
      setCheckOutBooks(JSON.parse(sessionStorage.getItem('recorded_status')))
      setRemovedItemArray(false)
    
  }, [removedItemArray, setRemovedItemArray])

  useEffect(() => {
    const getPubKey = async () => {
      const response = await axios.get('http://127.0.0.1:8000/payments/get-pub-key/')
      return response
    }

    if (paymentIntent === true){
      getPubKey().then((res) => {
        
        setstripePromise(JSON.stringify(res.data.pub_key))
      })
    }
    
  }, [paymentIntent, setstripePromise])

  useEffect(() => {
    
    const confirmCheckOutSession = async () => {
      
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/payments/checkout-session/',
        data: {
          email: user.email,
          items: checkOutBooks
        }
      })
      return res
    }
    if (checkoutSession){
      confirmCheckOutSession()
    } else {
      console.log('HINDI NAG TRUE BOBO')
    }
  }, [checkoutSession, checkOutBooks, user])

  console.log(clientSecret)
  
  let CheckoutData = {
    checkOutBooks: checkOutBooks,
    setCheckOutBooks: setCheckOutBooks,
    checkOutFormData: checkOutFormData,
    setCheckOutFormData: setCheckOutFormData,
    stripePromise: stripePromise,
    setPaymentIntent: setPaymentIntent,
    amount: amount,
    setAmount: setAmount,
    clientSecret: clientSecret,
    clientID: clientID,
    submitPayment: submitPayment,
    setSubmitPayment: setSubmitPayment,
    address: address,
    setAddress: setAddress,
    paymentMode: paymentMode,
    setPaymentMode: setPaymentMode,
    checkoutSession: checkoutSession,
    setCheckOutSession: setCheckOutSession,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
  }

  return (
    <CheckoutContext.Provider value={CheckoutData}>
      {(clientSecret && stripePromise && !isLoading) ?
      
      <Elements
        
        options={{ clientSecret }}
        stripe={loadStripe(stripePromise.split('"').join(''))}
      >
        <FormComponent />
      </Elements> 
      :
      <FormComponent/>
    }
      
      
    </CheckoutContext.Provider>
  )
}

export default CheckOut