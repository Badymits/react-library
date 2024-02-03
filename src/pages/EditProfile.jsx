import axios from 'axios';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const EditProfile = () => {

  let { user } = useContext(AuthContext)

  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)

  const handleInputChange = (e) => {
    console.log(`bio value: ${e.target.value}`)
    setBio(e.target.value)
  }

  const handleImageChange = (e) => {
    //console.log(`img value: ${URL.createObjectURL(e.target.files[0])}`)
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append('bio', bio)
    formData.append('image', image)

    console.log(`tis the image: ${image}`)
    
    await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/auth/user-edit-profile/${user.username}/`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
      params:{
        username: user.username,
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }
  

  return (
    <div>
      <h1>Edit Profile Form</h1>
        <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="bio">Edit Bio:</label>
            <input type="text" name='bio' value={bio} onChange={handleInputChange} className='border-black border-2'/>
            
            <br />
            <label htmlFor="profile-img">Edit Profile Image</label>
            <input type="file" accept='image/*' name='profile_img' alt="" className='border-black border-2' onChange={handleImageChange}/>
            <img src={image} alt="" className='max-h-[250px] max-w-[250px] object-contain'/>
            <button type="submit">Save Changes</button>
        </form>
    </div>
  )
}

export default EditProfile