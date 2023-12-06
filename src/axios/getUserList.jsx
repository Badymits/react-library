/* eslint-disable no-undef */
import axios from 'axios'

async function getUserList(){
    try{
        const response = await axios.get('http://127.0.0.1:8000/auth/user-list/');

        return response
    } catch (error) {
        console.log(error)
    }
}

export default getUserList
