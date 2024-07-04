import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserSearch } from '../../services/user/apiMethods'
import { Forward, Share2 } from 'lucide-react'
import Chat from '../../pages/chat/Chat'
import { toast } from 'sonner'

function SharePost({onClose, post}) {

  const selectedUser = (state) => state.auth.user
  const userData = useSelector(selectedUser)
  const userId = userData._id
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (searchQuery.length >= 2) { 
      getUserSearch({searchQuery: searchQuery})
       .then((response) => {
          setUsers(response.data.suggestedUsers);
        })
       .catch((error) => {
          console.error(error.message);
        });
    } else {
      setUsers([])
    }
  }, [searchQuery, setSearchQuery]); 

  const searchUser = (event) => {
    setSearchQuery(event.target.value); 
  };

  const handleNavigate = (user) => {
    if (user && post) {
      navigate('/chat', { state: { shareUser: user, sharePost: post } });
      onClose();
    } else {
      toast("Unable to share the post");
      onClose();
    }
  };

  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-md'>
  <div className='flex justify-center items-center h-full'>
    <div className='bg-white px-10 pt-4 pb-8 space-y-2 w-full h-96 max-w-md mx-auto rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>Share Post</h2>
        <button onClick={onClose} className="text-gray-800 dark:text-white px-2 py-2 rounded">
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
        </button>
      </div>
      <hr className="border-t-2 border-gray-200" />

      <div className="flex justify-center items-start h-14 mx-2 pt-0">
        <input 
          onChange={searchUser} 
          type="text" 
          placeholder="To..." 
          className="w-full max-w-md p-2 lg:mr-0 mt-1 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0" 
        />
      </div>
      {/* <div className="flex justify-center items-start  h-14 mx-2 pt-2">
        <input 
          onChange={searchUser} 
          type="text" placeholder="To..." className="w-full max-w-md p-2 lg:mr-0 rounded-l-lg focus:border-white focus:outline-none mt-1" />
      </div> */}
      
      <div className='space-y-4 pt-4 overflow-y-auto h-72'>
        {users.map((user) => (
          <div key={user.id} className='flex justify-between items-center'>
            <Link
              to={user._id === userId
                ? "/profile"
                : `/user-profile/${user._id}`
              }
              className='flex items-center cursor-pointer'>
              <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 overflow-hidden">
                <img className='rounded-full object-cover w-full h-full' src={user.profileImg} alt={user.userName} />
              </div>
              <div className='ml-4'>
                <p className='text-black font-medium'>{user.userName}</p>
                <p className='text-gray-500 text-sm'>{user.name}</p>
              </div>
            </Link>

            {userId !== user._id && (
              <div>
                <button 
                  onClick={() => handleNavigate(user)}
                  className='flex justify-center text-md items-center text-center bg-gray-400 hover:bg-blue-700 rounded-md text-white relative font-bold font-sans overflow-hidden transition-all duration-700 px-4 py-1 lg:w-24'>
                  <p className='mb-0'>Send</p> <Forward size={'20px'} className='ml-1' /> 
                </button>
                {/* <button 
                  onClick={() => handleNavigate(user)}
                  className='flex justify-center text-md items-center text-center bg-gray-500 hover:bg-blue-700 rounded-md text-white relative font-bold font-sans overflow-hidden transition-all duration-700 px-4 py-2 lg:w-24'>
                  <Share2 size={'20px'}/> send
                </button> */}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default SharePost