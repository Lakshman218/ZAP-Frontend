import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './dashboard/AdminDashboard'


function Admin() {
  const selectAdmin = (state) => state.adminAuth.admin
  const admin = useSelector(selectAdmin)
  const navigate = useNavigate()

  useEffect(() => {
    if(!admin) {
      navigate('/admin/login')
    }
  },[admin, navigate])
  
  return (
    <div>
      <AdminDashboard />
    </div>
  )
}

export default Admin