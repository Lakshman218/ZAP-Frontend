import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdminLogout } from '../../../utils/context/reducers/adminAuthSlice'
import { toast } from 'sonner'

function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedAdmin = (state) => state.adminAuth.admin
  const admin = useSelector(selectedAdmin)

  const handleLogout = () => {
    dispatch(AdminLogout());
    localStorage.removeItem("email");
    toast.info("Logout succussfull");
    navigate("/admin/")
  }
  return (
    // <div className='flex justify-center'>
    //   <div className='flex w-10/12 bg-gray-300 justify-start'>
    //     <div className='flex p-8 ml-10 justify-center items-center gap-5'>
    //       <div className="flex gap-4 ml-10">
    //         <img
    //           className=" h-40 w-40 rounded-full"
    //           src={admin.profileImg}
    //           alt=""
    //         />
    //       </div>
    //       <div className='block font-semibold text-2xl ml-10'>
    //         <div>{admin.name}</div>
    //         <div>{admin.email}</div>
    //       </div>
    //       <div>
    //         <button className='bg-black text-white py-3 px-6 rounded ml-10 items-center'>List Users</button>
    //       </div>
    //       <div>
    //         <button 
    //         onClick={handleLogout}
    //         className='bg-black text-white py-3 px-6 rounded ml-10 items-center'>Logout</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className='text-2xl font-semibold text-center mb-4'>Admin Dashboard</div>
      <div><button 
      onClick={handleLogout}
      className='bg-black text-white py-2 px-4 rounded'
      >Logout</button></div>
    </div>
  )
}

export default AdminDashboard