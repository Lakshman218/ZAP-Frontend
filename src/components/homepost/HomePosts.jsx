import React, { useEffect, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SavePost, deletePost } from '../../services/user/apiMethods';
import { toast } from 'sonner';
import { loginSuccuss, setPosts } from '../../utils/context/reducers/authSlice';
import EditPost from './EditPost';
import ReportModal from './ReportModal';

function HomePosts({post, fetchposts}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUser = (state) => state.auth.user
  const user = useSelector(selectedUser)
  console.log("user auth", user);
  const userId = user._id
  const postIds = user.savedPost
  console.log("post ids",postIds);
  const [isSavedByUser, setIsSavedByUser] = useState(
    user?.savedPost?.includes(post._id)
  )

  const imageUrlArray = post.imgUrl; 
  const postDate = formatDistanceToNow(new Date(post.date), { addSuffix: true });
  const postUserId = post.userId; 
  const profileImg = postUserId.profileImg; 
  const userName = postUserId.userName;

  // navigate to user profile
  const handleSearch = (postUserId) => {
    console.log("postUserId", postUserId);
    if(postUserId === userId) {
      navigate('/profile')
    } else {
      navigate(`/user-profile/${postUserId}`)
    }
  }

  // save post
  const handleSave = (postId, userId) => {
    console.log(postId, userId);
    try {
      SavePost({postId, userId})
        .then((response) => {
          const userData = response.data
          console.log("userdata", userData);
          dispatch(loginSuccuss({user: userData}))
          setIsSavedByUser(!isSavedByUser)
          toast.info(userData.message)
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  // handle dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // delete post
  const handleDeletePost = (postId, userId) => {
    try {
      deletePost({postId, userId})
        .then((response) => {
          const postData = response.data
          dispatch(setPosts({posts: postData.posts}))
          fetchposts()
          toast.info("post deleted")
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  // edit post
  const [IsEditPostOpen, setEditPostOpen] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null);
  const handlePostEdit = (postId) => {
    setCurrentPostId(postId);
    setEditPostOpen(!IsEditPostOpen)
  }

  // report post
  const [reportModal, setReportModal] = useState(false);
  const handleReportModal = () => {
    setReportModal(!reportModal);
    handleClickOutside()
  }
  
  return (

    <div className="w-full lg:px-10 lg:p-0 mb-8 mr-2 h-max rounded-md border-none shadow-md bg-white border">
      
      <div className='flex justify-between items-center'>
        {/* user details */}
        <div
        onClick={() => handleSearch(postUserId._id)} 
        className='flex cursor-pointer'>
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 overflow-hidden ">
            <img className='rounded-full object-cover w-full h-full' src={profileImg} alt="" />
          </div>
          <div className=' mb-1'>
            <p className='text-black lg:ml-4 ml-2 font-medium lg:text-xl'>{userName}</p>
            <p className='text-black lg:ml-4 ml-2 font-normal lg:text-sm'>{postDate}</p>
          </div>
        </div>

        
        {postUserId._id == userId ? (

          <div className='relative'>
            {/* edit or delete post */}
          <div onClick={handleToggleDropdown} className='flex cursor-pointer'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
            </svg>
          </div>

          {isDropdownOpen && (
            <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
              <button
              onClick={() => handlePostEdit(post._id)} 
              className='w-full px-4 py-2 text-left text-gray-800 hover:text-blue-600 hover:bg-gray-200 rounded-md'>
                Edit
              </button>
              <button
              onClick={() => handleDeletePost(post._id, userId)} 
              className='w-full px-4 py-2 text-left text-gray-800 hover:text-red-600 hover:bg-gray-200 rounded-md'>
                Delete
              </button>
            </div>
          )}
        </div>
        ) : (
          <div className='relative'>
            {/* report post */}
            <div onClick={handleToggleDropdown} className='flex cursor-pointer'>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
              </svg>
            </div>

            {isDropdownOpen && (
              <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
                <button 
                onClick={() => handleReportModal()}
                className='w-full px-4 py-2 text-left hover:text-red-600 hover:bg-gray-200 rounded-md'>
                  Report
                </button>
              </div>
            )}
          </div>
        )}
        
      </div>
    
      <div className=" lg:p-4 sm:p-0"> 
        <div id="controls-carousel" className="relative w-full bg-gray-200 " >
          <div className="relative h-56 overflow-hidden  md:h-96">
            <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-carousel-item>
              {imageUrlArray.map((imageUrl, index) => {
                return <img src={imageUrl} alt={`post ${index}`} />
              })}
            </div>
          </div>
      
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
            </span>
        </button>
      </div>
        
        <div className='text-gray-200  flex justify-between'>
          {/* like, comment, share */}
          <div className='py-1 mt-2 flex gap-3'>
            <div>
              <svg className="w-6 h-6 cursor-pointer text-black darktext-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
              </svg>
            </div>
            <div>
              <svg className="w-6 h-6 cursor-pointer text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
              </svg>
            </div>
            <div>
              <svg className="w-6 h-6 cursor-pointer text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
              </svg>
            </div>
          </div>
          {/* save post */}

          {(isSavedByUser ? (
            // saved
            <div 
            onClick={() => handleSave(post._id, userId)}
            className='py-1 mt-2 flex cursor-pointer'>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
            </svg>
          </div>
          ) : (
            // save
            <div
            onClick={() => handleSave(post._id, userId)} 
            className='py-1 mt-2 flex cursor-pointer'>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
            </svg>
          </div>
          ))}

        </div>
        <div className='text-black block py-2'>
          <p>{post.title}</p>
          <p className='text-sm ml-2'>{post.description}</p>
        </div>
      </div>

      {IsEditPostOpen && <EditPost handlePostEdit={handlePostEdit} postId={currentPostId} userId={userId} /> }

      {reportModal && <ReportModal closeModal={handleReportModal} postId={post._id} userId={userId} /> }

    </div>

)
}


export default HomePosts
