import { useContext, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

import { profile_picture, library_icon } from '../assets/images';
import { IoLibraryOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineFeed } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { BiLogOut  } from "react-icons/bi";

const Sidebar = () => {

  let {user, logoutUser, notificationArray} = useContext(AuthContext)

  const [activeNotif, setActiveNotif] = useState(false)
  //const [activeTab, setActiveTab] = useState('')


  // set variable that contains a list of urls where the sidebar should not show
  const withoutSidebarRoutes = ["/auth/register", "/auth/login"];

  // Returns the current location object, which represents the current URL in web browsers.
  const { pathname } = useLocation();
  
  // if the pathname or url is included in the list, then return null
  if (withoutSidebarRoutes.some((item) => pathname.includes(item))) return null;
  return (
    <div className='h-[100vh]'>
        <div className='flex flex-col items-center justify-center py-4 '>
            <div className='flex items-center justify-center  pb-6 relative'>
                <h1 className='text-3xl w-[300px] text-center  inline cursor-pointer  pr-[4rem] pt-2'>
                    <img src={library_icon} alt="library_icon" height={120} width={60} className='inline-block' />
                    Athenaeum
                </h1>
                <IoMdNotificationsOutline className='cursor-pointer absolute right-1 text-3xl hover:bg-gray-200 rounded-full' onClick={() => setActiveNotif(!activeNotif)} />
                <span className='text-xl text-red-500 absolute top-1 right-1 z-50'>{notificationArray ? notificationArray.length : ''}</span>
                <div className={activeNotif ? 'block absolute top-12 right-2 bg-[#dddbdb] w-[240px] border-2 border-black rounded-md' : 'hidden ' }>
                    <div className='bg-[#faf2f2] border-b-2 border-black'>
                        <NavLink to='notification'>See all notifications{notificationArray.length}</NavLink>
                    </div>
                    <ul>
                    {notificationArray.map((notif) => (
                        <li key={notif.id} className='cursor-pointer hover:bg-gray-300 duration-200'>
                            Para kay: {notif.user}
                            <br />
                            
                            {notif.message} 
                            <br />
                            {notif.date} || {notif.time}
                            <hr className='border-black border-1'/>
                        </li>
                    ))}
                    </ul>
                    
                    
                </div>
            </div>
            
            <img src={profile_picture} alt="profile_pic" height={450} width={180} />
            {user && <h1 className='text-xl pt-4'>Hello! {user.first_name} <br /> <p>{user.username}</p> </h1>}
        </div>
        <hr className='w-[300px] block mx-auto border-1 border-[#D9D9D9]'/>
        <nav className='pt-8'>
        
            <div className='text-xl space-y-2'>
                <div className=' '>
                    <NavLink to='/library' className={({isActive, isTransitioning}) => 
                        [isActive ?
                        'flex items-center gap-3 px-24 active-tab' :
                        'inactive-tab hover:hover-tab',
                        isTransitioning ? 
                        'transitioning' :
                        ''
                        ].join(" ")
                        
                        } 
                    >
                        <IoLibraryOutline className='mr-2'/>
                        Library
                    </NavLink>
                </div>
                <div className=''>
                    <NavLink to='/notification' className={({isActive}) => isActive ?
                        'flex items-center gap-3 px-24 active-tab' :
                        'inactive-tab hover:hover-tab'
                        }>
                        <MdOutlineFeed className='mr-2'/>
                        Notifications
                    </NavLink>
                </div>
                <div className=''>
                    <NavLink to='/profile' className={({isActive}) => isActive ?
                        'flex items-center gap-3 px-24 active-tab' :
                        'inactive-tab hover:hover-tab'
                        }>
                        <ImProfile className='mr-2'/>
                        Profile
                    </NavLink>
                </div>

                <hr className='w-[300px] block mx-auto border-1.5  border-[#D9D9D9]'/>

                <div className=''>
                    <NavLink to='/settings' className={({isActive}) => isActive ?
                        'flex items-center gap-3 px-24 active-tab' :
                        'inactive-tab hover:hover-tab'
                        }>
                        <CiSettings className=' text-2xl'/>
                        Settings
                    </NavLink>
                </div>

                {user ? (
                    <div className=''>
                        <NavLink 
                            onClick={logoutUser}
                            className='flex items-center gap-3 px-24 py-8 text-2xl hover:hover-tab'
                        >
                            <BiLogOut />
                            Logout
                        </NavLink>
                    </div>
                    
                ) : (
                    <div className='text-center'>
                        <NavLink to='/auth/login' className='hover:hover-tab'>Login</NavLink>
                    </div>
                )}
            </div>
        </nav>
    </div>
    
  )
}

export default Sidebar