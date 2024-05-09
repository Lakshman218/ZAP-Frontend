import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomePosts from '../../components/homepost/HomePosts'
import MiniProfile from '../../components/userMiniProfile/MiniProfile'

function HomePage() {
  const selectedUser = (state) => state.auth.user
  const user = useSelector(selectedUser)
  return (
    <div className='flex justify-between w-full'>
      <div className='w-full mr-7'>
        <HomePosts/>  
      </div>
      <div className='hidden md:flex'>
        <MiniProfile />
      </div>
    </div>
  )
}

export default HomePage 