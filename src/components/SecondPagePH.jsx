/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { CheckoutContext } from "../pages/pagetab/CheckOut";
import uuid from 'react-uuid';
import {
  useStripe,
  useElements,
  AddressElement,
  PaymentElement
} from "@stripe/react-stripe-js";
import { AuthContext } from "../context/AuthContext";


// prop passing to manipulate state in FormComponent.jsx
const SecondPagePH = ({ changeFormStatus, setStep, isFormComplete }) => {

  let { user,setNotificationArray } = useContext(AuthContext)
  let { address ,setAddress, paymentMode, setPaymentMode, setCheckOutSession, checkOutBooks } = useContext(CheckoutContext)

  const [email, setEmail] = useState('')
  
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
    console.log('form submitted')
    if (isFormComplete){
      console.log(`PROCESSING....`)
      let fullname = ''
      
      try{
        await stripe.confirmPayment({
          
          elements,
          confirmParams:{
            payment_method_data:{
              billing_details:{
                name: fullname,
                email: user.email,
                address: address.full_address
              }
            },
            receipt_email: user.email,
            return_url: ''
          },
          redirect: "if_required"
          
        }).then((res) => {
          console.log(res)
          console.log('AAAAAAAA')
          setCheckOutSession(true)
          setStep(2)
          console.log(checkOutBooks)
          setNotificationArray(prevState => [
            ...[{
              id: uuid(),
              user: user.first_name,
              books: checkOutBooks,
              message: "Successful Transaction! Your books are now being processed and we are now preparing for delivery! Please note it may take at least a week so please bear with us or else",
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString()
            }],
            ...prevState
          ])
          
        }).catch((err) => {
          console.error(err)
        })
        
      } catch (error){
        console.log(error)
      }
    }else {
      console.log('potangina')
    }
    
  }

  
  // when address details have been filled, execute this function to get the address values and store it 
    // in state so it can be displayed for user confirmation in the third step of the checkout form
    if(address_details){
      address_details.on('change', function(e){
        if(e.complete){
          const address_element = elements.getElement('address')
          address_element.getValue().then((element) => {
            
            setAddress({
              'full_address': element.value.address.line1 + " " + element.value.address.line2 + " " + element.value.address.city + "  " + element.value.address.state
            })
          })
          
          changeFormStatus(true)
        }
      })
    }
    
  return (
    <div>
      <h1 className="text-xl">Customer Details</h1>
      {/* <p>{i}</p> */}
      <form action="" onSubmit={handlePaymentSubmit} id="my-stripe-form">
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
        <h1 >Enter Address</h1>
        <small className="underline pb-5">Type 3 or more letters in address bar to fill in address manually</small>
        <AddressElement  options={{mode: 'billing'}} />
        <button type="submit" className="bg-[#6AB187] text-white py-3 w-[150px]  rounded-lg">Confirm Payment</button>
      </form>
    </div>
  )
}

export default SecondPagePH