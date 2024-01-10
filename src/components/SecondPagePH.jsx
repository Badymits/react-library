import { useContext, useState } from "react";
import { CheckoutContext } from "../pages/pagetab/CheckOut";

import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const SecondPagePH = () => {

  // let stripePromise;
  // const getStripe = () => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  //   }
  //   return stripePromise;
  // };

  let { user } = useContext(AuthContext)
  let { testVar, clientSecretOne } = useContext(CheckoutContext)

  const [email, setEmail] = useState('')
  
  console.log(clientSecretOne)
  //const elements = 

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
  }
  // console.log(stripePromise)

  // Create the Address Element in billing mode
  // const addressElement = elements.create('address', {
  //   mode: 'billing',
  // });
  //console.log(elements)
  // const options = {
  //   clientSecret: clientSecretOne
  // }
  return (
    <div>
      SecondPagePH
      {testVar}
      <form action="" onSubmit={handlePaymentSubmit}>
        <label htmlFor="user_email" className="block">Enter email: </label>
        <input type="email" name="user_email" value={user ? user.email : email} required onChange={(e) => setEmail(e.target.value)} 
          className="border-2 border-black w-[50%] mb-[30px]" 
        />
        
        <label htmlFor="user_card" className="block">Card Input</label>
        <CardElement id="user_card" className="border-2 border-black h-[40px] align-middle"/>

        {/* <PaymentElement options={{ clientSecretOne }}/> */}
        {/* <AddressElement /> */}
      </form>
    </div>
  )
}

export default SecondPagePH