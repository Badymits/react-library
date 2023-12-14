
import { Outlet } from 'react-router-dom';


import PageHeader from '../components/PageHeader'

const Library = () => {
  

  return (
    <section className='relative border-x-2 overflow-y-hidden'>
        <div className='border-b-2 border-gray-400 z-[100] fixed w-[49.8%] top-0  h-[80px] mb-[200px]'>
            <PageHeader />
        </div>
        <div className='px-6 pt-[100px]'>
            {/* Nested Routes will render here */}
            <Outlet />
        </div>
    </section>
  )
}

export default Library