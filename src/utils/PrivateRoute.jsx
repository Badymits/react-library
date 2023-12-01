import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = () => {

    // destructure authcontext component to only get user state
    let { user } = useContext(AuthContext)

    // If user is authorized (basically succesfully logged in), return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to='/auth/login'/>
 
}

export default PrivateRoute