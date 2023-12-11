
import { Outlet } from 'react-router-dom';


import PageHeader from '../components/PageHeader'

const Library = () => {
  
//   const [currentTab, setcurrentTab] = useState('popular')

  return (
    <section className='relative'>
        <div className=' sticky top-0 w-full  border-b-2 border-gray-400 z-[100]'>
            <PageHeader />
        </div>
        <div className='px-6 pt-10'>
            {/* Nested Routes will render here */}
            <Outlet />
        </div>
    </section>
  )
}

export default Library