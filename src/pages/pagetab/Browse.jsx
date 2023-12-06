import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import getBookList from '../../axios/getBookList';

const Browse = () => {

  const [books, setBooks] = useState([])

  const swiperRef = useRef()
  

  useEffect(() => {
    getBookList().then(res => {
        setBooks(res)
    })
  }, [])

console.log(books)
  return (
    <div>
      <div className='relative pt-10'>
        <Swiper
          spaceBetween={40}
          slidesPerView={3}
          loop={true}
          pagination={{
            el: '.swiper-custom-pagination',
            type: "bullets",
            clickable: true,
            bulletClass: `swiper-pagination-bullet`,
            bulletActiveClass: 'bg-[#69b086]',
            
          }}
          modules={[Pagination, Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          className='px-10 '
          
        >
          <div className=''>
            <h1>Computer Science</h1>
            {books.map((book) => (
              <div key={book.id}>
                {book.genre.map((item) => (
                  // conditional rendering
                  item.name === 'Computer Science' ? (
                    <SwiperSlide key={book.id}>
                      <img src={book.book_image} alt={book.title} width={120} height={150} className='object-cover' />
                      {book.title}
                    </SwiperSlide>
                  ) : null
                ))}
              </div>
            ))}
          </div>
        </Swiper>

        <div>
          <button className='absolute -left-5 bottom-[50%] top-[50%] cursor-pointer z-40' onClick={() => swiperRef.current?.slidePrev()}>Prev</button>
          <button className='absolute -right-5 bottom-[50%] top-[50%] cursor-pointer z-40' onClick={() => swiperRef.current?.slideNext()}>Next</button>
        </div>
        <div className='absolute top-0 right-0 '>
          <div className="swiper-custom-pagination"></div>
        </div>
      </div>
        
    </div>
  )
}

export default Browse