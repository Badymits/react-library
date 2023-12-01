import { useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import { reading_time, library_icon } from '../assets/images';

const LoginPage = () => {
  
  // deconstructing the variable to only get the loginuser function
  // since this component needs the data from the provider, we call the authcontext variable
  let {loginUser} = useContext(AuthContext);

  return (
    <div className='bg-white w-[1450px] h-[800px] grid grid-cols-2 justify-center items-center divide-x-4 mt-16  divide-black m-auto'>
      
      <div className='flex flex-col items-center w-full h-full justify-center relative'>
        <p className='absolute top-[50px] text-3xl text-center'>Welcome back! <br /> Ready to learn something new?</p>
        <img src={reading_time} alt="reading_time" height={550} width={550} />
      </div>

      <div className='flex flex-col items-center justify-center gap-10 w-full h-full'>
        
        <h1 className='text-4xl w-[300px] text-center inline'>
          <img src={library_icon} alt="library_icon" height={150} width={80} className='inline-block' />
          Athenaeum
        </h1>

        <form className='px-8 pt-6 pb-8 mb-4' action="" onSubmit={loginUser}>
          <div className='mb-6'>
            <label className='block text-gray-700 text-lg font-bold mb-2' htmlFor="email">Email</label>
            <input type="text" name='email' className='shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline' placeholder='Enter Email' />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-lg font-bold mb-2' htmlFor="password">Password</label>
            <input type="password" className='shadow appearance-none w-[400px] border py-2 px-3 text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline' name='password' placeholder='Enter Password' />
            <a href="" className='block text-sm pt-2 text-[#6AB187]'>Forgot Password?</a>
          </div>
            
          <div>
            <input type="submit" name='submit' value='Login' className='bg-[#6AB187] hover:bg-[#7fcc9f] duration-150 mx-auto uppercase text-xl block cursor-pointer w-[200px] p-3 rounded-xl text-white'/>
            <button className='block mx-auto text-md pt-3 text-[#6AB187]' >
              <Link to='/auth/register'>
                Create an account
              </Link>
            </button>
          </div>
            
        </form>
      </div>
        
    </div>
  )
}

export default LoginPage