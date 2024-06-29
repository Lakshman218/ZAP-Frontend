import React, { useEffect, useState } from 'react'
import PostGraph from './PostGraph'
import { getAllUsers, getDashboardDetails } from '../../services/admin/apiMethods'
import ApexChart from './Chart'

function GraphList() {

  const [isDashboardData, setDashboardDatas] = useState('')
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    getDashboardDetails()
      .then((response) => {
        const dashboardDatas = response.data
        setDashboardDatas(dashboardDatas)
        // console.log("dashboardDatas",dashboardDatas);
      })
    getAllUsers()
      .then((response) => {
        const data = response.data
        console.log("get users data", data);
        setUserDetails(data)
      })
  },[])



  return (
    <div>
      <div>
        <ApexChart />
      </div>
      <div>
        {/* <PostGraph /> */}
      </div>
    </div>
  )
}

export default GraphList