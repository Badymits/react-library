/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

import SecondPagePH from "./SecondPagePH";
import ThirdPagePH from "./ThirdPagePH";
import FirstPage from "./FirstPage";

const FormComponent = () => {
    let { booksInCart } = useContext(AuthContext)

    const navigate = useNavigate()

    const [step, setStep] = useState(0)
    //let isFirstStep = true
    const conditionalComponent = () => {
        switch(step){
            case 0:
                return <FirstPage />;
            case 1:
                return <SecondPagePH />;
            case 2:
                return <ThirdPagePH />;
            default:
                return <FirstPage />
        }
    }

    const next = () => {
        //if (step >= step.length - 1) return i
        if (step > 0) {
            //isFirstStep = false
            //setStep(step + 1)
        } 
        setStep(step + 1)
    }

    const back = () => {
        if (step <= 0) {
            //isFirstStep = true
            return step
        }
        setStep(step - 1)
    }

  return (
    <>
        <div>
            
            {booksInCart.length > 0 ? 
                <div className="relative">
                    <div className="h-[30px] bg-blue-200">
                        placeholder progress bar
                    </div>
                    <div className="w-full h-[50px]   text-center  font-bold flex justify-between items-center px-1">
                        <button className={(step > 0) ?  "bg-blue-400 w-[100px] text-white py-3  rounded-lg" : 'bg-blue-200 text-black w-[100px] py-3 rounded-lg' } 
                            onClick={back}
                        >
                            Back
                        </button>
                        <div className="text-black text-3xl">{(step + 1)} / 3</div>
                        <button className={(step === 2) ? "bg-[#6AB187] w-[100px] text-white py-3  rounded-lg" : "bg-blue-400 w-[100px] text-white py-3  rounded-lg"} onClick={next}>{(step === 2) ? 'Submit' : 'Next'}</button>
                    </div>
                    
                    {/* this will render the current page of the multi step form */}
                    {conditionalComponent()}
                    
                </div>
                
                : 
                <p className="text-center text-2xl ">
                    No books have been added to cart
                    <br />
                    Click <button className="font-bold text-blue-400" onClick={() => navigate('../browse')}>here</button> to browse!
                </p>
            }
            
        </div>
    </>
  )
}

export default FormComponent