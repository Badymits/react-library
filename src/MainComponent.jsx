import { useContext } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom'

import { RegisterPage, Library, Feed, Profile } from './pages'

import Sidebar from './components/Sidebar';
import PrivateRoute from './utils/PrivateRoute';


import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/LoginPage';
import CheckOut from './pages/pagetab/CheckOut';
import Browse from './pages/pagetab/Browse';
import BookDetailView from './pages/BookDetailView';
import Home from './pages/pagetab/Home';
import SearchResult from './pages/SearchResult';
import NotifDetails from './pages/NotifDetails';


const MainComponent = () => {

  let { loggedIn } = useContext(AuthContext)

  return (
    <div className={loggedIn ? 'flex justify-between' : 
        'bg-[#69b086] w-full h-screen flex justify-center'}>

        {/* fixed positioning cannot work with grid, but you can work around it by making a child div
          of the parent and you can place fixed positioning on the child */}
        <div className='basis-[25%] sticky top-0 self-start flex justify-center border-r-2 '>
          <Sidebar />
        </div>

        <div className='basis-[50%]' >

            <Routes>
                {/* elements here requires user authentication */}
                <Route path='/'  element={<PrivateRoute />}>

                    {/* this is just a work around on how to put nested routes inside an index element
                    I intend to make the library route the default page when user logs in, however that cannot be possible
                    since there are nested routes within it */}

                    <Route index element={<Navigate to='library' replace={true}/>}/>

                    <Route path='/library' element={<Library />} > 
                      <Route index element={<Navigate to='home' replace={true} />}/>
                      <Route path='home' element={<Home />}/>
                      <Route path='browse' element={<Browse />}>
                        <Route path='search-result' element={<SearchResult />}/>
                      </Route>
                      <Route path='checkout' element={<CheckOut />}/>
                    </Route>
                    
                    <Route path='/notification' element={<Feed />} >
                      <Route path=':id' element={<NotifDetails />}/>
                    </Route>
                    <Route path='/profile' element={<Profile />}/>
                </Route>
                <Route path='/auth/login' element={<LoginPage />}/>
                <Route path='/auth/register' element={<RegisterPage />}/>
            </Routes>
        </div>

        <div className='basis-[25%] sticky top-0 self-start h-[100vh]  border-l-2'>
          <BookDetailView 
            loggedIn={loggedIn}
          />
        </div>
        
    </div>
  )
}

export default MainComponent