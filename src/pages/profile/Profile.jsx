import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../utils/context/reducers/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUser = (state) => state.auth.user
  const user = useSelector(selectedUser)
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("email")
    toast.info("Logout succussfull")
    navigate('/login')
  }

  return (
    <div className='flex justify-center'>
      <div className='flex w-10/12 bg-gray-300 justify-start'>
        <div className='flex p-8 ml-10 justify-center items-center gap-5'>
          <div className="flex gap-4 ml-10">
            <img
              className=" h-40 w-40 rounded-full"
              src={user.profileImg}
              alt=""
            />
          </div>
          <div className='block font-semibold text-2xl ml-10'>
            <div>{user.userName}</div>
            <div>{user.email}</div>
          </div>
          <div>
            <button className='bg-black text-white py-3 px-6 rounded ml-10 items-center'>Edit Profile</button>
          </div>
          <div>
            <button 
            onClick={handleLogout}
            className='bg-black text-white py-3 px-6 rounded ml-10 items-center'>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile