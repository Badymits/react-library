import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'

const NotifDetails = () => {

  let { notificationArray } = useContext(AuthContext)
  const [notifDetail, setNotifDetail] = useState( 
    localStorage.getItem('NotifDetail') ? JSON.parse(localStorage.getItem('NotifDetail')) : ""
  )

  const { id } = useParams()

  useEffect(() => {
    // if id === notificationArray[index].id{ setNotifDetail(id) }
    let notifObj = notificationArray.find(item => item.id === id)
    console.log(notifObj)
    localStorage.setItem('NotifDetail', JSON.stringify(notifObj))
    setNotifDetail(notifObj)
  }, [id, notificationArray])

  console.log(notifDetail)
  return (
    <div className='mx-2'>
        <h1 className='text-4xl text-green-500 pb-12'>Notification Details</h1>
        {notifDetail &&
            <div>
                
                <p className='text-lg'>{notifDetail.message}</p>
                <div className='text-2xl pt-4'>Books Rented/Purchased: {notifDetail.books.map((book) => (
                    <div key={book.id} className='h-[350px]  hover:bg-gray-200 hover:border-2 duration-100 flex items-center px-2 my-10 gap-4 cursor-pointer'>
                      <img src={book.book_image} alt={book.book_title} className='object-contain max-h-[250px] max-w-[250px] hover:max-h-[230px] hover:max-w-[230px] duraiton-300'/>
                        <p>{book.book_title}</p>
                        <p>{book.book_price}.00</p>
                        <p>{book.book_output_status}</p>
                        
                    </div>
                    
                ))}</div>
            </div>
        }
        

    </div>
  )
}

export default NotifDetails