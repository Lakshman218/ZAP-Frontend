import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { followUser, getUserSuggestions } from '../../services/user/apiMethods'
import { ArrowBigDownDash, UserRoundPlus } from 'lucide-react'
import { toast } from 'sonner'

function MiniProfile({ fetchposts }) {
    const selectedUser = (state) => state.auth.user;
    const user = useSelector(selectedUser);
    const userId = user._id || "";
    const [users, setUsers] = useState([]);  
  
    const fetchUserSuggestions = () => {
      getUserSuggestions({ userId })
        .then((response) => {
          const suggestions = Array.isArray(response.data.suggestedUsers) ? response.data.suggestedUsers : [];
          setUsers(suggestions);
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Failed to fetch user suggestions");
        });
    };
  
    useEffect(() => {
      fetchUserSuggestions();
    }, []);
  
    const handleFollow = (suggestedUserId) => {
      followUser({ userId, followingUser: suggestedUserId })
        .then((response) => {
          fetchUserSuggestions();
          toast.success("Followed successfully");
        })
        .catch((error) => {
            console.log(error.message);
            toast.error("Failed to follow user");
        });
        // fetchposts();
    };
  
    return (
      <div className="lg:w-80 mr-2 max-w-xs block justify-end p-4">
        <div className="w-full mb-2 max-w-sm rounded-md border-none shadow-md bg-white border dark:bg-black dark:border-gray-700 dark:shadow-gray-500">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-6">
            <img src={user.profileImg} className="w-24 h-24 mb-3 rounded-full shadow-lg" alt="" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.userName}</h5>
            <span className="text-sm text-gray-900 dark:text-gray-400">{user.name}</span>
            <div className="flex mt-4 md:mt-4">
              <Link to="/profile" className="">
                <button
                  className="overflow-hidden relative w-32 p-2 h-10 flex justify-center items-center bg-gray-600 text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
                >
                  Profile
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1.5 left-6 z-10 ml-3">Profile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
  
        <div className="w-full max-w-md rounded-md border-none shadow-md bg-white border sm:p-8 dark:bg-black dark:border-gray-700 dark:shadow-gray-500">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-md font-semibold leading-none text-gray-700 dark:text-white">Suggested for you</h5>
            <span className="text-sm font-normal text-gray-600 hover:underline dark:text-blue-500 mr-1">
              <ArrowBigDownDash />
            </span>
          </div>
          {users.length > 0 ? (
            users.map((suggestedUser) => (
              <div key={suggestedUser._id} className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-2">
                    <div className="flex items-center justify-between gap-3">
                      <Link 
                        to={user._id === suggestedUser._id ? "/profile" : `/user-profile/${suggestedUser._id}`}
                        className="flex"
                      >
                        <div className="flex-shrink-0">
                          <img className="w-11 h-11 rounded-full bg-black" src={suggestedUser.profileImg} alt="" />
                        </div>
                        <div className="flex-1 min-w-0 ml-2 text-center flex items-center mb-1">
                          <div className="flex flex-col justify-start text-start">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {suggestedUser.userName}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {suggestedUser.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div
                        onClick={() => handleFollow(suggestedUser._id)}
                        className="inline-flex items-center text-base font-semibold text-black cursor-pointer dark:text-white text-center mb-1"
                      >
                        <UserRoundPlus className="rounded-full p-1 size-8 hover:text-blue-700 hover:bg-slate-200" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No suggestions available</p>
          )}
        </div>
      </div>
    );
  }

export default MiniProfile
