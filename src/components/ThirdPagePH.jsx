import { useContext } from "react"
import { CheckoutContext } from "../pages/pagetab/CheckOut"

const ThirdPagePH = () => {

  let { address } = useContext(CheckoutContext)

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>User Address: {JSON.stringify(address.full_address).split(null).join('')}</p>
    </div>
  )
}

export default ThirdPagePH