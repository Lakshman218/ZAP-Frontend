import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserSuggestions } from '../../services/user/apiMethods'


function MiniProfile() {    
    const selectedUser = (state) => state.auth.user
    const user = useSelector(selectedUser)
    const userId = user._id
    const [users, setUsers] = useState([])  

    useEffect(() => {
        // console.log("inside minprofile");   
        getUserSuggestions(userId)
            .then((response) => {
                setUsers(response.data.suggestedUsers)
                // console.log("responsedata",response.data);
            })
            .catch((error) => {
                console.log(error.message)
            })
    },[])
    
    return (
        
        <div className="w-full mr-2 max-w-xs block  justify-end p-4">
            <div className=" w-full mb-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-6">
                    <img src={user.profileImg} className='w-24 h-24 mb-3 rounded-full shadow-lg' alt="" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.userName}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    <div className="flex mt-4 md:mt-6">
                        {/* <Link to={'/profile'} className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Profile</Link> */}
                        <Link to={'/profile'} className=''>
                        <button
                            class="overflow-hidden relative w-32 p-2 h-10 flex justify-center items-center bg-gray-600 text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
                            >
                            Profile
                            <span
                                class="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"
                            ></span>
                            <span
                                class="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"
                            ></span>
                            <span
                                class="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"
                            ></span>
                            <span
                                class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1.5 left-6 z-10 ml-3"
                                >Profile</span
                            >
                        </button>

                        </Link>
                    </div>
                </div>
            </div>

            {/* suggustions */}

            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-black dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Show Suggusions</h5>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
                </div>
                {users.map((suggestedUsers) => (
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-2">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full bg-black" src={suggestedUsers.profileImg} alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-1 text-center flex items-center mb-1">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {suggestedUsers.userName}
                                        </p>
                                        {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p> */}
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-blue-700 cursor-pointer dark:text-white text-center mb-1">
                                        Follow
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MiniProfile