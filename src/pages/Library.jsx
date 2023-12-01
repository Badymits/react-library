import {useState, useEffect} from 'react'

import getUserList from '../axios/getUserList'
import PageHeader from '../components/PageHeader'

const Library = () => {
  
  const [currentTab, setcurrentTab] = useState('popular')
  const [userList, setUserList] = useState([])

  useEffect(() => {
    getUserList().then(res => {
      setUserList(res.data)
    })
  }, [])

  return (
    <section className=''>
        <div className='pb-24'>
            <PageHeader />
        </div>
        {/* <div>
            <h1 className='text-2xl font-bold underline'>
            Hello World!!!
            </h1>
            <p>List of users:</p>
            {userList.map((user, id) => (
                <ul key={id}>
                    <li >{user.email}</li>
                </ul>
            ))}
        </div> */}
        <div className=''>
            <div className='h-[250px] '>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
            <div className='h-[250px] bg-green-100'>
                <h1 className='text-2xl font-bold underline'>
                Hello World!!!
                </h1>
                
            </div>
        </div>
        
        
    </section>
  )
}

export default Library