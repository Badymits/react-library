import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {


  return (
    <div className="h-[100vh]">
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={true}
            navigation={true}
            loop={true}
            className='h-[250px] block mx-auto xl:max-w-[800px] lg:max-w-[760px]'
          >
            <SwiperSlide className='swiper-container-home'>
              <h1 className='text-6xl text-gray-400'>GRAND OPENING!!!! </h1>
            </SwiperSlide>
            <SwiperSlide className='swiper-container-home bg-yellow-200'>
              <h1 className='text-2xl'>Havent found a book to read? <br /> Search now by clicking <Link to='../browse' className='text-blue-700'>here!</Link></h1>
            </SwiperSlide>
            <SwiperSlide className='swiper-container-home px-16 bg-red-200'>
              <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptates culpa minima aspernatur? 
                Maxime quae consequatur harum vero facere distinctio! Quasi deleniti a deserunt dicta? 
                Quibusdam modi eveniet libero ipsam?</h1>
            </SwiperSlide>
          </Swiper>
        </div>
        
        <div>
          <h1>Whats new</h1>
          <Link to='../browse'>Clcik here to browse some books</Link>
        </div>
        
    </div>
  )
}

export default Home