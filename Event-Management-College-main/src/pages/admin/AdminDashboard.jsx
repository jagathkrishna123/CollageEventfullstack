import React, { useEffect, useState } from 'react'
import { adminDashboard_data } from '../../Constants/ProgramData'

const AdminDashboard = () => {

    const [dashboardData, setDashboardData] = useState({
    events: 0,
    upcomingEvents:0,
    completedEvents:0,
    registrations: 0,
    attendance:0,
    feedbackReceived:0,
  })

    const fetchDashboard = async () => {
    setDashboardData(adminDashboard_data)
  }

   useEffect(() => {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10'>
        <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_1} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.events}</p>
                  <p className='text-gray-200 font-medium'>Total Events</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_2} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.upcomingEvents}</p>
                  <p className='text-gray-200 font-medium'>Upcoming Events</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_3} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.completedEvents}</p>
                  <p className='text-gray-200 font-medium'>Completed Events</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_3} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.registrations}</p>
                  <p className='text-gray-200 font-medium'>Total Reg</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_3} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.attendance}</p>
                  <p className='text-gray-200 font-medium'>Attendance</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white/40 p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                {/* <img src={assets.dashboard_icon_3} alt="" /> */}
                <div>
                  <p className='text-xl font-bold text-gray-900'>{dashboardData.feedbackReceived}</p>
                  <p className='text-gray-200 font-medium'>Feedbacks</p>
                </div>
            </div>
        </div>

        <div>
          {/* ....heading...... */}
            <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
              {/* <img src={assets.dashboard_icon_4} alt="" /> */}
              <p>Latest Events</p>
            </div>
          {/* ....Table...... */}
            <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white/40'>
              <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-gray-200 text-left uppercase'>
                  <tr>
                    <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                    <th scope='col' className='px-2 py-4'>Event Title</th>
                    <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                    <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                    <th scope='col' className='px-2 py-4'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {dashboardData.recentBlogs.map((blog, index)=> {
                    return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
                  })} */}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard