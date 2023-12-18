
import { Outlet } from 'react-router-dom';


import PageHeader from '../components/PageHeader'

const Library = () => {
  

  return (
    <section className=''>
        <div className='border-b-2 border-gray-400 z-[100] sticky w-full top-0  h-[80px] '>
            <PageHeader />
        </div>
        <div className='px-6 pt-[20px] max-w-[930px]'>
            {/* Nested Routes will render here */}
            <Outlet />
        </div>
    </section>
  )
}

export default Library