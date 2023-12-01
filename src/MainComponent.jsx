import { useContext } from 'react';
import {Route, Routes} from 'react-router-dom'

import { RegisterPage, Library, Feed, Profile } from './pages'

import Sidebar from './components/Sidebar';
import PrivateRoute from './utils/PrivateRoute';


import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/LoginPage';
import MyLibrary from './pages/pagetab/MyLibrary';

const MainComponent = () => {

  let { loggedIn } = useContext(AuthContext)

  return (
    <section>
        <div className=''>
          <div className={loggedIn ? 'grid grid-cols-4 gap-x-2 h-screen divide-gray-400 divide-x-2' : 
             'bg-[#69b086] w-full h-screen flex justify-center'}
             >

              {/* fixed positioning cannot work with grid, but you can work around it by making a child div
                of the parent and you can place fixed positioning on the child */}
              <div className='flex justify-center'>
                <div className='fixed '>
                  <Sidebar />
                </div>
              </div>


              <div className=' col-span-2 px-6 ' >
              
                <Routes>
                    {/* elements here requires user authentication */}
                    <Route path='/'  element={<PrivateRoute />}>
                        <Route path='/' element={<Library />} >
                          <Route path='/my-library' element={<MyLibrary />}/>
                        </Route>
                        <Route path='/feed' element={<Feed />} />
                        <Route path='/profile' element={<Profile />}/>
                    </Route>
                    <Route path='/auth/login' element={<LoginPage />}/>
                    <Route path='/auth/register' element={<RegisterPage />}/>
                </Routes>
              </div>
              
              <div className={loggedIn ? 'bg-yellow-200 ' : 'hidden'}>
                right column
              </div>
          </div>
      </div>
    </section>
  )
}

export default MainComponent