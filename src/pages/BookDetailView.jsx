/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const BookDetailView = ({ title, book_id, loggedIn, isClicked }) => {
  
  const [bookDetail, setBookDetail] = useState(null)
  console.log('here')
  let { bookId } = useParams();
  console.log(bookId)
  // useEffect(() => {

  // }, [])

  console.log('Clicked on: ', book_id)

  return (
    <div className={loggedIn ? `w-full h-full flex justify-center` : 'hidden'}>
      <div className={`pt-8`}>
        <h1>aaa</h1>
        <h1>{bookId}</h1>
        <h1 className="text-4xl">
          Welcome
        </h1>
      </div>
        
    </div>
  )
}

export default BookDetailView