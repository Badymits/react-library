import { useContext, useEffect, useState } from "react"
import { useOutlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";


const Profile = () => {

  let { user } = useContext(AuthContext)
  const [userBio, setUserBio] = useState('')
  const [userProfileImg, setUserProfileImg] = useState(null)
  const outlet = useOutlet()
  const navigate = useNavigate()
  console.log(user)

  useEffect(() => {
    const fetchUserProfile = async() => {
        const res = await axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/auth/user-profile/${user.username}/`,
            headers: {
                'Content-Type': 'Application/json'
            },
            
        })
        return res
    }
    fetchUserProfile().then((res) => {
        console.log(JSON.stringify(res.data))
        setUserBio(JSON.stringify(res.data.bio))
        setUserProfileImg(JSON.stringify(res.data.profile_pic).split('"').join(''))
        
    }).catch((err) => {
        console.error(err)
    })
    console.log('run')
  }, [user])

  return (
    <section className="">
        { outlet || 
            <div>
                <div className='h-[250px] bg-green-100'>
                    <img src="" alt="" />
                    
                </div>
                <div className="relative border-b-2 h-[200px]">
                    <img src={userProfileImg} alt="" className="max-h-[250px] max-w-[150px] object-contain absolute -top-[80px] left-5  rounded-full"/>
                    <div className=" pt-[85px] pl-[20px]">
                        <h1 className='text-3xl font-bold '>
                            {user.first_name}
                        </h1>
                        <p>{userBio}</p>
                        <p className="text-gray-500">@{user.username}</p>
                        <p className="text-gray-500">Joined on November 2023</p>
                    </div>
                    <button 
                        onClick={() => navigate('edit-profile')}
                    className="absolute right-10 top-4 border-black border-[1px] rounded-full p-2 w-[8rem] font-thin cursor-pointer 
                    hover:bg-gray-300 duration-100">Edit Profile</button>
                </div>
            </div>
            
        }
        
    </section>
  )
}

export default Profile