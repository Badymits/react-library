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

    let { booksInCart, setBooksInCart } = useContext(AuthContext)

    let {checkOutBooks, setCheckOutBooks, setPaymentIntent, paymentMode, setPaymentMode, setAddress} = useContext(CheckoutContext)

    const navigate = useNavigate()

    // used for the pages of the multistep form
    const [step, setStep] = useState(0 )

    const [isFormComplete, setIsFormComplete] = useState(false)
    const [finalBtn, setFinalBtn] = useState(false)

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
                return <SecondPagePH changeFormStatus={changeFormStatus} setStep={setStep} isFormComplete={isFormComplete} finalBtn={finalBtn}/>;
            case 2:                
                return <ThirdPagePH />;
            default:               
                return <FirstPage />
        }
    }

    
    useEffect(() => { 
        
        let btn = document.getElementById('next-btn')

        // whenever the step is on the 1st step, set the next btn to disabled and adjust the tailwind css
        if (step === 1) {
            console.log('STEP IS 1. I REPEAT STEP IS: ', step)
            setPaymentIntent(true)
            btn.classList.add('bg-white')

            btn.classList.add('cursor-default')
        
        // whenever the multi step form is not on page 1, then enable the next btn 
        } 

    }, [isFormComplete, 
        step, 
        setPaymentIntent ])
    

    const next = () => {
        console.log('current step: ', step)
        
        if (paymentMode === 'card' && isFormComplete && step === 1){
            console.log('IS THIS EVEN RUNNING POTANGINA')
            setFinalBtn(true)
            var currentstep = 1;
            setStep(currentstep)
            return step
        }

        if (step === 2){
            setBooksInCart([])
            setCheckOutBooks([])
            setPaymentIntent(false)
            setPaymentMode('')
            setAddress('')
            setStep(0)
            sessionStorage.removeItem('recorded_status')
            localStorage.removeItem('cart_books')
            navigate('/library/home')
        }
        
        // user cannot proceed to form without selecting output status for each book
        if (checkOutBooks.length < booksInCart.length){
            alert('make sure to set books to purchase or rent')
            return step
        }
        setStep(step + 1)
        localStorage.setItem('step', step + 1)

        
    }

    const back = () => {
        if (step <= 0) return step
        setStep(step - 1)
        localStorage.setItem('step', step - 1)
    }

  return (
    <>
        <div>
            
            {booksInCart.length > 0 ? 
                <div className="relative">
                    <div className="w-full h-[50px]   text-center  font-bold flex justify-between items-center px-1 ">
                        <button className={(step > 0) ?  "bg-blue-400 w-[100px] text-white py-3  rounded-lg" : 'bg-blue-200 text-black w-[100px] py-3 rounded-lg' } 
                            onClick={back}
                        >
                            Back
                        </button>
                        <div className="text-black text-3xl">{(step + 1)} / 3</div>
                        <button className=
                        {(step === 2) ? "bg-[#6AB187]  text-white py-3 w-[100px]  rounded-lg" : "bg-blue-400  text-white py-3 w-[100px]  rounded-lg " }
                            onClick={next}
                            id="next-btn"
                            type="submit"
                            form="my-stripe-form"
                            >
                            {(step === 1) ? 'Submit' : 'Next'}
                            {(step === 2) && 'Home Page'  }
                            
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