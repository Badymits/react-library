/* eslint-disable react/prop-types */
import {useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import "swiper/swiper-bundle.css";

const SwiperComponent = ({
    resultComSci,
    genre, // the genre prop will separate the swiper pagination classes
    title, // the genre couldn't be the h1 title since it would mess up the pagination if there were any spaces in it
}) => {
  if (!resultComSci) return null;
  
  
  console.log(resultComSci)
  // for the navigation slides (nextslide and prevslide)
  const swiperRef = useRef()

  return (
    <div className='swiper-container'>
        <Swiper
            spaceBetween={35}
            slidesPerView={3}
            slidesPerGroup={3}
            modules={[Pagination, Navigation]}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper
            }}
            pagination={{
                el: `.swiper-pagination-${genre}`,
                type: "bullets",
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'bullet-active-class',
                
            }}
            className='px-10 pt-8  '> 
                  
            {
              resultComSci.slice(0,9).map((book) => (
                <SwiperSlide key={book.id}  className='flex flex-col items-center justify-between h-[400px] text-center gap-4 cursor-pointer pt-2
                hover:border-2 hover:border-red-200 hover:bg-gray-100 transition-all duration-300'>
                  <img src={book.book_image} alt={book.title}  className='object-contain max-h-[250px] max-w-[250px]' />
                    
                  <p>{book.title}</p>
                  <p>{book.author.name}</p>

                </SwiperSlide>
              ))
            }    
        </Swiper>  
            <div >
                <button className='absolute -left-1 bottom-[50%] top-[50%] cursor-pointer z-[500]' onClick={() => swiperRef.current?.slidePrev()}>Prev</button>
                <button className='absolute -right-1 bottom-[50%] top-[50%] cursor-pointer z-[500]' onClick={() => swiperRef.current?.slideNext()}>Next</button>
            </div>
            <div className=''>
              <h1 className='absolute top-0 left-3 text-2xl'>{title}</h1>
              <div className='absolute top-0 right-4'>
                  <div className={`swiper-pagination-${genre}`}></div>
              </div>
            </div>
            
    </div>    
  )
}

export default SwiperComponent