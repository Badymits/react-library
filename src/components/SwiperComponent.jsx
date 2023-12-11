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
}) => {
  if (!resultComSci) return null;
  
  
  console.log(resultComSci)
  // for the navigation slides (nextslide and prevslide)
  const swiperRef = useRef()
  return (
    <div className='swiper-container'>
        <Swiper
            spaceBetween={40}
            slidesPerView={3}
            modules={[Pagination, Navigation]}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper
            }}
            pagination={{
                el: `.swiper-pagination-${genre}`,
                type: "bullets",
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'bg-[#69b086]',
                
            }}
            className='px-10 pt-8 h-[200px] '> 
                  
            {
              resultComSci.slice(0,5).map((book) => (
                <SwiperSlide key={book.id}>
                  {book.title}
                </SwiperSlide>
              ))
            }    
        </Swiper>  
            <div >
                <button className='absolute -left-1 bottom-[50%] top-[50%] cursor-pointer z-[500]' onClick={() => swiperRef.current?.slidePrev()}>Prev</button>
                <button className='absolute -right-1 bottom-[50%] top-[50%] cursor-pointer z-[500]' onClick={() => swiperRef.current?.slideNext()}>Next</button>
            </div>
            <h1 className='absolute top-0 text-3xl'>{genre}</h1>
            <div className='absolute top-0 right-0'>
                <div className={`swiper-pagination-${genre}`}></div>
            </div>
    </div>    
  )
}

export default SwiperComponent