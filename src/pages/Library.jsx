
import { Outlet } from 'react-router-dom';


import PageHeader from '../components/PageHeader'

const Library = () => {
  
//   const [currentTab, setcurrentTab] = useState('popular')

  return (
    <section>
        <div className='pb-24 w-full m-0 p-0'>
            <PageHeader />
        </div>
        <div>
            {/* Nested Routes will render here */}
            <Outlet />
        </div>
    </section>
  )
}

export default Library