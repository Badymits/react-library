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
        {id}
        <h1 className='text-4xl text-green-500 pb-12'>Notification Details</h1>
        {notifDetail &&
            <div>
                {/* Reminder tomorrow to add image to checkout books */}
                <p className='text-lg'>{notifDetail.message}</p>
                <p className='text-2xl pt-4'>Books Rented/Purchased: {notifDetail.books.map((book) => (
                    <p key={book.id}>
                        <p>{book.book_title}</p>
                        <p>{book.book_price}.00</p>
                        <p>{book.book_output_status}d</p>
                        
                    </p>
                    
                ))}</p>
            </div>
        }
        

    </div>
  )
}

export default NotifDetails