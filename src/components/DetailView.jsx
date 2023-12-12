/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';


const BookDetailView = ({ title, author, genre, description, loggedIn }) => {
  
  const [bookDetail, setBookDetail] = useState(null)

  // useEffect(() => {

  // }, [])

  return (
    <div className={loggedIn ? `w-full h-full flex justify-center` : 'hidden'}>
      <div className={`pt-8`}>
        <h1 className="text-4xl">
          Welcome
        </h1>
      </div>
        
    </div>
  )
}

export default BookDetailView