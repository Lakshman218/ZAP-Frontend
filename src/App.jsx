import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Profile from './pages/profile/Profile'
import userHomePage from './pages/homepage/userHomePage'

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
     <Profile/>
    </>
  )
}

export default App