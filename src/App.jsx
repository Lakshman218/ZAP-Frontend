import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Profile from './pages/profile/Profile'
import HomePage from './pages/userHomePage/HomePage'
import Protect from './routes/protect'
import SideNavBar from './components/SideNavBar'
import MiniProfile from './components/userMiniProfile/MiniProfile'
import HomePosts from './components/homepost/HomePosts'


function App() {
  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Protect>
        {/* <Profile/> */}
        <div className='flex justify-between'>
          <SideNavBar />
          <HomePosts />
          <MiniProfile />
        </div>
      </Protect>
    </>
  )
}

export default App