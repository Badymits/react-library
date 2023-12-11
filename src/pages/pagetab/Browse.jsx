import { useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';


import { AuthContext } from '../../context/AuthContext';
import SwiperComponent from '../../components/SwiperComponent';


const Browse = () => {

  let { books } = useContext(AuthContext)

  // let this variable contain the search parameters (to be implemented and optimized later)
  const bookGenre = ['Computer Science', 'Fiction']
  const bookGenreFic = [ 'Fiction']
  
  // filtering nested arrays since books can have multiple genres
  // will be modified later so it can filter by multiple queries (title, author, and genre)
  const resultCom = books.filter(book => book.genre.every(b => bookGenre.includes(b.name)))
  const resultFic = books.filter(book => book.genre.every(b => bookGenreFic.includes(b.name)))


  
  return (
    <div className='h-[100vh]'>
      <div className='relative pt-10 mb-[15em] '>
        <SwiperComponent 
          resultComSci={resultCom}
          genre='comsci'
        />  
      </div>
      <div className='relative pt-10 mb-[15em]'>
        <SwiperComponent 
          resultComSci={resultFic}
          genre='fiction'
        />
      </div>
      
    </div>
  )
}

export default Browse