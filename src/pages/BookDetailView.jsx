/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

import { IoMdClose } from "react-icons/io";
import { IoLogoFacebook, IoLogoTiktok  } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const BookDetailView = ({ title, loggedIn }) => {
  
  // when using basic conditional rendering, just leave the state empty, dont put any values
  const [bookDetailComp, setBookDetailComp] = useState()

  const closeRightPanel = () => {
    setBookDetailComp()
  }

  let { bookId } = useContext(AuthContext)

  useEffect(() => {

    const fetchData = async () => {
      const data = await axios.get( `http://127.0.0.1:8000/get-book-detail/${bookId}/`)
      return data
    }
    fetchData().then((res) => {
      console.log(res.data)
      setBookDetailComp(res.data)
    }).catch((err) => (
      console.log(err)
    ))
    
  }, [bookId])


  return (
    <div className={loggedIn ? 'w-full h-full flex justify-center relative' : 'hidden'}>
      <div>
            {
              bookDetailComp ?
              
              <div className='w-full h-screen bg-gray-200 flex flex-col items-center pt-[40px]  px-8 text-justify align-center gap-6'>
                <IoMdClose className='text-2xl absolute top-10 right-5 hover:bg-gray-200 rounded-full cursor-pointer' onClick={() => closeRightPanel()}/>
                
                <img src={bookDetailComp.book_image} alt={bookDetailComp.title} className='max-h-[350px] max-w-[350px]' />
                <p>{bookDetailComp.title}</p>
                <p>{bookDetailComp.author.name}</p>
                <p className=''>{bookDetailComp.summary}</p>
                <button className='absolute bottom-10 bg-[#6AB187] w-[80%] py-3 rounded-full mt-10 text-white text-2xl'>
                  Add to Cart
                </button>
              </div>
              :
              <div className='w-full h-screen pt-[20px] px-6 text-justify '>
                <h1 className='text-center text-4xl'>Welcome!!</h1>
                <p className='pt-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam sit nemo magni vel, 
                  dolorum dicta earum. Veniam adipisci eaque rerum excepturi possimus ipsum voluptatem. 
                  Numquam sint voluptates voluptate temporibus aspernatur?</p>
                <p>more lorem ipsum whit</p>
                <p>more lorem ipsum whit</p>
                <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam sit nemo magni vel, 
                  dolorum dicta earum. Veniam adipisci eaque rerum excepturi possimus ipsum voluptatem. 
                  Numquam sint voluptates voluptate temporibus aspernatur?</p>
                  <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam sit nemo magni vel, 
                  dolorum dicta earum. Veniam adipisci eaque rerum excepturi possimus ipsum voluptatem. 
                  Numquam sint voluptates voluptate temporibus aspernatur?</p>
                <div className='flex items-center gap-4 absolute bottom-10 right-5 left-10 text-[#38a164]'>
                  <h1 className=''>You may contact and <br/> follow us on:</h1>
                  <IoLogoFacebook className='cursor-pointer text-4xl hover:text-[#6AB187] duration-200'/>
                  <FaSquareXTwitter className='cursor-pointer text-4xl hover:text-[#6AB187] duration-200'/>
                  <IoLogoTiktok className='cursor-pointer text-4xl hover:text-[#6AB187] duration-200'/>
                  <SiGmail className='cursor-pointer text-4xl hover:text-[#6AB187] duration-200'/>
                </div>
              </div>
            }
          </div>  
    </div>
  )
}

export default BookDetailView