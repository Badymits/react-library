import { useContext } from "react"
import { Link, useOutlet } from 'react-router-dom'
import PageHeader from "../components/PageHeader"
import { AuthContext } from "../context/AuthContext"


const Feed = () => {

  let { notificationArray } = useContext(AuthContext)
  const outlet = useOutlet()

  return (
    <section className='xl:max-w-[930px] lg:max-w-[760px]'>

        <div className='border-b-2 border-gray-400 z-[100] sticky w-full top-0  h-[80px] '>
            <PageHeader />
        </div>
        {
            outlet // show nested routes if true
            || 
            // else show the notifications list
            <div>
                <h1 className="font-bold text-2xl p-2">Notifications</h1>
                {notificationArray.map((notif) => (
                    <Link key={notif.id} to={`${notif.id}`}>
                        <div 
                        
                        className="w-full px-2 my-8 cursor-pointer hover:bg-gray-300 duration-200"
                        >
                        <p className="font-bold">Order Success!</p>
                        <p className="text-sm text-gray-500">{notif.date} | {notif.time}</p>
                        <p>{notif.message}</p>
                        <br className=""/>
                    </div>
                    </Link>
                    
                ))}
            </div>
        }
        
    
    </section>
  )
}

export default Feed