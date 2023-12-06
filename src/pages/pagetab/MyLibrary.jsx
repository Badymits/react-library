import { useState, useEffect } from 'react';

import getBooksFromAPI from '../../axios/getBooksAPI';

// This page contains the books that the user liked/bookmarked and will provide a list of recommendations
const MyLibrary = () => {

  const [bookAPI, setBookAPI] = useState([])

  useEffect(() => {
    getBooksFromAPI().then(res => {
        console.log(res)
        setBookAPI(res)
    })
  }, [])


  console.log(bookAPI)

  return (
    <div>
        <div className=''>
            <div className='h-[250px] '>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
        </div>
    </div>
  )
}

export default MyLibrary