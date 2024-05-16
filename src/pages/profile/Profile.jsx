import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setPosts } from '../../utils/context/reducers/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import PostGallery from '../../components/profile/postGallery'
import { getUserConnection, getUserPost } from '../../services/user/apiMethods'
import EditProfile from '../../components/profile/editProfile'

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

      // getUserConnection(userId)
      //   .then((response)  => {
      //     const connectionData = response.data.connection;  
      //     setFollowers(connectionData.followers)
      //     setFollowing(connectionData.following)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })

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
          <div className='flex bg-gray-200 w-full rounded-md'>
            <div className='flex p-8 ml-4 justify-center gap-8'>
              <div className="flex ml-8">
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
              <div className='flex'>
                <div>
                  <button 
                  onClick={openEditProfile}
                  className='bg-black text-white py-2 px-6 rounded ml-10 items-center'>Edit Profile</button>
                  {IsEditProfileOpen && <EditProfile closeEditProfile={closeEditProfile} />}
                </div>
                <div>
                  <button 
                  onClick={handleLogout}
                  className='bg-black text-white py-2 px-6 rounded ml-8 items-center'>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='w-full mt-5 grid grid-cols-2 md:grid-cols-3 gap-5 bg-black rounded-md  p-8'>
          {posts.length === 0? (
            <div className='text-center items-center text-cyan-600 font-semibold py-5'>
              Create your first post.
              <div className='mt-2 text-cyan-600'>
                Capture the moment with a friend
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id}>
                <PostGallery post={post}/> 
              </div>
            ))
          )}
        </div>

      </div>
  )
}

export default Profile