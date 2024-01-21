/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { CheckoutContext } from "../pages/pagetab/CheckOut";

import SecondPagePH from "./SecondPagePH";
import ThirdPagePH from "./ThirdPagePH";
import FirstPage from "./FirstPage";

// =====================================================
// READ IMPORTANT
// this component will be responsible for the functionality of 
// the multistep form ONLY and cannot communicate with the backend
// =====================================================

const FormComponent = () => {

    let { booksInCart } = useContext(AuthContext)

    let {checkOutBooks, setCheckOutBooks, setPaymentIntent} = useContext(CheckoutContext)

    const navigate = useNavigate()

    // used for the pages of the multistep form
    const [step, setStep] = useState(0)

    const [isFormComplete, setIsFormComplete] = useState(false)

    const changeFormStatus = (status) => {
        setIsFormComplete(status)
    }

    {/* 
        MULTI-STEP FORM:

        1st step === Book Cart Confirmation (Rent Book, Purchase Book or Remove Book from Cart) 
        2nd step === Input Address and Payment details
        3rd step === Order Confirmation and Receipt
        
    */}
    const conditionalComponent = () => {
        switch(step){
            case 0:
                return <FirstPage checkOutBooks={checkOutBooks} setCheckOutBooks={setCheckOutBooks}/>;
            case 1:
                return <SecondPagePH changeFormStatus={changeFormStatus}/>;
            case 2:
                return <ThirdPagePH />;
            default:
                return <FirstPage />
        }
    }

    // when set to true, remove the disable attribute for the next-btn so user can proceed with checkout
    useEffect(() => { 
        if (isFormComplete){
            console.log(isFormComplete)
            let btn = document.getElementById('next-btn')
            console.log("IT IS ALREADY TRUE WHY THE FUCK ISN'T IT CHANGING THE FUCKING BUTTON WHAT THE FUCK")
            btn.disabled = false

            btn.classList.remove('cursor-not-allowed')
            btn.classList.remove('bg-blue-200')

            btn.classList.add('cursor-pointer')
            btn.classList.add('bg-blue-400')
        } 

    }, [isFormComplete])

    const next = () => {
        console.log('current step: ', step)
        
        let btn = document.getElementById('next-btn')
        // user cannot proceed to form without selecting output status for each book
        if (checkOutBooks.length < booksInCart.length){
            alert('make sure to set books to purchase or rent')
            return step
        }

        if (step === 0) {
            console.log('STEP IS 1. I REPEAT STEP IS: ', step)
            setPaymentIntent(true)

            // disabling the button until user has completed the address form
            if (isFormComplete === false) {
                console.log('By default.... it is false')
                btn.setAttribute("disabled", "")

                btn.classList.remove('cursor-pointer')
                btn.classList.remove('bg-blue-400')

                btn.classList.add('cursor-not-allowed')
                btn.classList.add('bg-blue-200')

            }
        }
        setStep(step + 1)
    }

    const back = () => {
        if (step <= 0) return step
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
                        <button className=
                        {` cursor-pointer
                            ${(step === 2) ? 
                            "bg-[#6AB187] w-[100px] text-white py-3  rounded-lg" : 
                            "bg-blue-400 w-[100px] text-white py-3  rounded-lg"}`}
                            onClick={next}
                            id="next-btn"
                            >
                            {(step === 2) ? 'Submit' : 'Next'}
                        </button>
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