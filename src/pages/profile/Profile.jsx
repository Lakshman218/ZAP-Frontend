import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setPosts } from '../../utils/context/reducers/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import PostGallery from '../../components/profile/postGallery'
import { getUserConnection, getUserPost } from '../../services/user/apiMethods'
import EditProfile from '../../components/profile/editProfile'
import emptypost from '../../../public/images/nopost.jpg'

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedUser = (state) => state.auth.user;
  const selectPosts = (state) => state.auth.posts;
  const user = useSelector(selectedUser);
  console.log("userdata", user);
  const posts =  useSelector(selectPosts) || []
  console.log("userposts", posts);
  const userId = user._id;
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [IsEditProfileOpen, SetEditProfileOpen] = useState(false)
  const userimg = user.profileImg
  const openEditProfile = () => {
    SetEditProfileOpen(true)
  }
  const closeEditProfile = () => {
    SetEditProfileOpen(false)
  }

  useEffect(() => {
    try {
      getUserPost(userId)
        .then((response) => {
          const postsData = response.data
          dispatch(setPosts({posts: postsData}))
        })
        .catch((error) => {
          console.log(error);
        })

      getUserConnection(userId)
        .then((response)  => {
          const connectionData = response.data.connection;  
          setFollowers(connectionData.followers)
          setFollowing(connectionData.following)
        })
        .catch((error) => {
          console.log(error);
        })

    } catch (error) {
      console.log(error);
    }
  }, [])

  // logout
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("email")
    toast.info("Logout succussfull")
    navigate('/login')
  }

  return (
      <div className='w-full p-4 mr-2'>
        <div className='flex w-full justify-center mb-6'>
          <div className='flex bg-white w-full rounded-md shadow-md'>
            <div className='lg:flex lg:p-8 ml-4 justify-center gap-8'>
              <div className="flex lg:ml-8 justify-center">
                <img
                  className=" h-40 w-40 rounded-full"
                  src={userimg}
                  alt=""
                />
              </div>
              <div className='block ml-10'>
                <div className='font-semibold text-3xl pb-2'>{user.userName}</div>
                <div className='pb-0'>{user.name}</div>
                <div className='pb-1'>{user.bio}</div>
                <div className='flex justify-between  mt-2 cursor-pointer'>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <p className="font-medium text-lg">{posts.length}</p>
                    <p className="text-sm">Posts</p>
                  </div>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <p className="font-medium text-lg">{followers.length}</p>
                    <p className="text-sm">Followers</p>
                  </div>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <p className="font-medium text-lg">{following.length}</p>
                    <p className="text-sm">Following</p>
                  </div>
                </div>  
              </div>
              <div className='flex lg:ml-4'>
              <div>
                <button 
                onClick={openEditProfile}
                className='lg:bg-black lg:text-white lg:h-10 lg:w-28 py-2 px-4 rounded ml-10 '>Edit Profile</button>
                {IsEditProfileOpen && <EditProfile closeEditProfile={closeEditProfile} />}
              </div>
              <div>
                <button 
                onClick={handleLogout}
                className=' lg:bg-black lg:text-white lg:h-10 lg:w-28 py-2 px-4 rounded ml-10 '>Logout</button>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        {posts.length === 0? (
        <div className='flex flex-col justify-center items-center mt-4 left-10 fixed text-black w-full h-auto '>
          <img className='w-96' src={emptypost} alt="" />
          <p>Create your first post.</p>
        </div>
        ) : (
        <div className='w-full mt-5  rounded-md  bg-white'>
          <div className='flex justify-between px-10  gap-10 p-2 font-normal text-lg'>
            <div className='bg-white w-full text-center h-10 flex items-center justify-center rounded hover:shadow-md'>
              <button>Posts</button>
            </div>
            <div className='bg-white w-full text-center h-10 flex items-center justify-center rounded hover:shadow-md'>
              <button>Saved</button>
            </div>
          </div>
        
          <div className='grid grid-cols-2 md:grid-cols-3 gap-5 bg-white p-2'>
            {
              posts.map((post) => (
                <div key={post._id}>
                  <PostGallery post={post}/> 
                </div>
              ))
            }
          </div>
        </div>
      )}

      </div>
  )
}

export default Profile