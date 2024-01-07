import { useContext } from "react";
import { CheckoutContext } from "../pages/pagetab/CheckOut";

const SecondPagePH = () => {
  let {testVar} = useContext(CheckoutContext)
  

  return (
    <div>
      SecondPagePH
      {testVar}
    </div>
  )
}

export default SecondPagePH