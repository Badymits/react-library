import { useContext, useEffect, useState } from 'react';

// modules have to be present so items inside navigation and pagination will display properly
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { AuthContext } from '../../context/AuthContext';
import SwiperComponent from '../../components/SwiperComponent';

import { Outlet, useLocation } from 'react-router-dom';


const Browse = () => {

  let { books, searchResults } = useContext(AuthContext)
  
  const [changeOutletView, setChangeOutletView] = useState(false)
  let { pathname } = useLocation()
  

  // let this variable contain the search parameters (to be implemented and optimized later)
  const bookGenre = ['Computer Science']
  const bookGenreFic = ['Fiction']
  
  // filtering nested arrays since books can have multiple genres
  // will be modified later so it can filter by multiple queries (title, author, and genre)
  const resultCom = books.filter(book => book.genre.every(b => bookGenre.includes(b.name)))
  const resultFic = books.filter(book => book.genre.every(b => bookGenreFic.includes(b.name)))

  // useEffect to change the data rendered if there are any inputs/results returned <from></from> the search bar
  //... very scuffed way
  useEffect(() => {
    
    if (searchResults){
      console.log(searchResults.length)
      setChangeOutletView(true)
    }

    if (pathname !== '/library/browse/search-result') {
      setChangeOutletView(false)
    }

  }, [searchResults,pathname, changeOutletView])

  console.log(changeOutletView)
  return (
    <div>  
      {changeOutletView  ?
        <Outlet />
        :
        <div className=''>
          <div className='relative pt-10 mb-[10em]'>
              <SwiperComponent 
                resultComSci={resultCom}
                genre={'ComputerScience'}
                title='Computer Science'
              />  
          </div>
          <div className='relative pt-10 mb-[10em]'>
            <SwiperComponent 
              resultComSci={resultFic}
              genre={'Fiction'}
              title='Fiction'
            />
          </div>
      </div> 
      }
      
      
    </div>
    
  )
}

export default Browse