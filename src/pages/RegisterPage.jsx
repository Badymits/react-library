import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { online_reading, library_icon } from '../assets/images'
import { AuthContext } from "../context/AuthContext"

const RegisterPage = () => {
  
  let { registerUser } = useContext(AuthContext)
  
  const [formState, setFormState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    password2: '',
  })

  const handleChange = (e) => {
    const val = e.target.value
    console.log(val)

    // when setting the state of an object, you need to merge all the properties by yourself. 
    //In other words, if you update a property of an object with state updater, the remaining 
    //properties of the objects are not merged by themselves unlike class components
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: val
    }))
  }

  

  return (
    <div className='bg-white w-[1450px] h-[800px] mt-16  grid grid-cols-2 justify-center items-center divide-x-4  divide-black m-auto'>
      <div className="flex flex-col items-center w-full h-full justify-center relative">
        <p className='absolute top-[50px] text-3xl text-center'>Come join us in this <br /> World of knowledge!</p>
        <img src={online_reading} alt="reading_time" height={550} width={550} />
      </div>
      <div className="flex flex-col items-center justify-center gap-10 w-full h-full ">
        <h1 className='text-4xl w-[300px] text-center inline'>
          <img src={library_icon} alt="library_icon" height={150} width={80} className='inline-block' />
          Athenaeum
        </h1>
        <form className="flex flex-col items-center px-8 pb-2 mb-2 " action="" onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.email} 
              placeholder="Enter Email..." 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="first_name">First Name</label>
            <input 
              type="text" 
              name="first_name" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.first_name} 
              placeholder="Enter First name..." 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="last_name">Last Name</label>
            <input 
              type="text" 
              name="last_name" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.last_name} 
              placeholder="Enter Last name..." 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.username} 
              placeholder="Enter Username..." 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.password} 
              placeholder="Enter Password..." 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password2">Confirm Password</label>
            <input 
              type="password" 
              name="password2" 
              className="shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
              onChange={handleChange} 
              value={formState.password2} 
              placeholder="Confirm Password..." 
            />
          </div>
          
          <div>
            <input type="submit" name="submit" value="Register" className="bg-[#6AB187] hover:bg-[#7fcc9f] duration-150 mx-auto uppercase text-xl block cursor-pointer w-[200px] p-3 rounded-xl text-white"/>
            <button className='block mx-auto text-md pt-3 text-[#6AB187]' >
              <Link to='/auth/login'>
                Login with existing account
              </Link>
            </button>
          </div>
         
        </form>
      </div>
      
      
    </div>
  )
}

export default RegisterPage