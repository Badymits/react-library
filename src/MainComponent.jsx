import { useContext } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom'

import { RegisterPage, Library, Feed, Profile } from './pages'

import Sidebar from './components/Sidebar';
import PrivateRoute from './utils/PrivateRoute';


import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/LoginPage';
import MyLibrary from './pages/pagetab/MyLibrary';
import CheckOut from './pages/pagetab/CheckOut';
import Browse from './pages/pagetab/Browse';
import BookDetailView from './pages/BookDetailView';


const MainComponent = () => {

  let { loggedIn } = useContext(AuthContext)

  return (
    <div className={loggedIn ? 'grid grid-cols-4 h-[100%]' : 
        'bg-[#69b086] w-full h-screen flex justify-center'}>

        {/* fixed positioning cannot work with grid, but you can work around it by making a child div
          of the parent and you can place fixed positioning on the child */}
        <div className='flex justify-center '>
          <div className='fixed h-screen '>
            <Sidebar />
          </div>
        </div>

        <div className=' col-span-2 h-full ' >
          <div className=''>
            <Routes>
                {/* elements here requires user authentication */}
                <Route path='/'  element={<PrivateRoute />}>

                    {/* this is just a work around on how to put nested routes inside an index element
                    I intend to make the library route the default page when user logs in, however that cannot be possible
                    since there are nested routes within it */}

                    <Route index element={<Navigate to='library' replace={true}/>}/>

                    <Route path='/library' element={<Library />} > 
                      <Route index element={<Navigate to='browse' replace={true} />}/>
                      <Route path='browse' element={<Browse />}/>
                      <Route path='my-library' element={<MyLibrary />} />
                      <Route path='checkout' element={<CheckOut />}/>
                    </Route>
                    
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/profile' element={<Profile />}/>
                </Route>
                <Route path='/auth/login' element={<LoginPage />}/>
                <Route path='/auth/register' element={<RegisterPage />}/>
            </Routes>
          </div>
          <div className='fixed w-[24.7vw]  right-0 top-0 bottom-0'>
            <BookDetailView />
          </div>
        </div>
    </div>
  )
}

export default MainComponent