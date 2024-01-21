import { useContext, useState } from "react";
import { CheckoutContext } from "../pages/pagetab/CheckOut";

import {
  useStripe,
  useElements,
  AddressElement,
  PaymentElement
} from "@stripe/react-stripe-js";
import { AuthContext } from "../context/AuthContext";


// prop passing to manipulate state in FormComponent.jsx
const SecondPagePH = ({ changeFormStatus }) => {

  let { user } = useContext(AuthContext)
  let { setAddress } = useContext(CheckoutContext)

  const [email, setEmail] = useState('')
  const [paymentMode, setPaymentMode] = useState('') // to determine which element should be rendered 
  
  const stripe = useStripe()
  const elements = useElements()
  
  // setting it as a global var so it can be accessed by multiple functions
  const address_details = elements.getElement(AddressElement)

  // choosing payment mode for user (as of now just the card payment is available)
  const handlePaymentModeChange = (e) => {
    if (e.target.value === 'card'){
      setPaymentMode('card')
    } else {
      setPaymentMode('')
    }
    console.log(e.target.value)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    let fullname = ''
    
    // address_details.on('change', function(e){
    //   if(e.complete){
    //     console.log('address is complete')
    //   }
    // })
    
    try{
      await stripe.confirmPayment({
        
        elements,
        confirmParams:{
          payment_method_data:{
            billing_details:{
              name: fullname,
              email: user.email,
              //address: full_address
            }
          },
          receipt_email: user.email,
          return_url: ''
        },
        redirect: "if_required"
        
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.error(err)
      })
      
    } catch (error){
      console.log(error)
    }
  }

  // when address details have been filled, execute this function to get the address values and store it 
  // in state so it can be displayed for user confirmation in the third step of the checkout form
  if(address_details){
    address_details.on('change', function(e){
      if(e.complete){
        const address_element = elements.getElement('address')
        address_element.getValue().then((element) => {
          console.log(element.value.address.city)
          setAddress({
            'full_address': element.value.address.line1 + " " + element.value.address.line2 + " " + element.value.address.city + "  " + element.value.address.state
          })
        })
        console.log('address is complete')
        changeFormStatus(true)
      }
    })
  } else {
    console.log('Nothing')
  }
  
  
  return (
    <div>
      <h1 className="text-xl">Customer Details</h1>
      <form action="" onSubmit={handlePaymentSubmit}>
        <label htmlFor="user_email" className="block">Enter email: </label>
        <input type="email" name="user_email" value={user ? user.email : email} required onChange={(e) => setEmail(e.target.value)} 
          className="border-2 border-black w-[50%] mb-[30px]" 
        />
        
        <label htmlFor="user_card" className="block">Input Card Details</label>

        <div onChange={handlePaymentModeChange} aria-required>
          <h1 className="text-xl">Select mode of payment</h1>
          <input type="radio" name="payment_mode" value="cash_on_delivery" id="cod" defaultChecked={paymentMode === "cash_on_delivery"}  />
          <label htmlFor="cod">Cash on Delivery</label>
          <br />
          <input type="radio" name="payment_mode" value="card" id="card" defaultChecked={paymentMode === "card"}  />
          <label htmlFor="card">Card Payment</label>
        </div>
        

        { paymentMode === 'card' ?  <PaymentElement id="payment" className="pt-10" /> : <p></p>}
        
        <hr className="py-4"/>
        <h1>Enter Address</h1>
        <AddressElement  options={{mode: 'billing'}} />
        <button type="submit">Test Submit</button>
      </form>
    </div>
  )
}

export default SecondPagePH