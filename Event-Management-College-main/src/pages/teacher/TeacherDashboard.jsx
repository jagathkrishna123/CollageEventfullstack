import React, { useEffect, useState } from 'react'
import { teacherDashboard_data, EVENTDATAS } from '../../Constants/ProgramData'
import { FaCalendarAlt, FaClock, FaCheckCircle, FaUsers, FaUserCheck, FaStar, FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const TeacherDashboard = () => {

    const [dashboardData, setDashboardData] = useState({
    events: 0,
    upcomingEvents:0,
    completedEvents:0,
    registrations: 0,
    attendance:0,
    feedbackReceived:0,
  })

    const fetchDashboard = async () => {
    setDashboardData(teacherDashboard_data)
  }

   useEffect(() => {
    fetchDashboard()
  },[])

  const statsCards = [
    {
      title: "Total Events",
      value: dashboardData.events,
      icon: <FaCalendarAlt className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    },
    {
      title: "Upcoming Events",
      value: dashboardData.upcomingEvents,
      icon: <FaClock className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    },
    {
      title: "Completed Events",
      value: dashboardData.completedEvents,
      icon: <FaCheckCircle className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    },
    {
      title: "Total Registrations",
      value: dashboardData.registrations,
      icon: <FaUsers className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    },
    {
      title: "Attendance",
      value: dashboardData.attendance,
      icon: <FaUserCheck className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    },
    {
      title: "Feedbacks Received",
      value: dashboardData.feedbackReceived,
      icon: <FaStar className="w-8 h-8 text-slate-400" />,
      bgColor: "from-slate-600 to-slate-700",
      lightBg: "bg-slate-600/10"
    }
  ]

  // Get recent events (first 5)
  const recentEvents = EVENTDATAS.slice(0, 5)

  return (
    <div className='flex-1 h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8 font-out'>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Teacher Dashboard</h1>
          <p className="text-gray-400 text-lg">Welcome back! Here's what's happening with your events.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {statsCards.map((card, index) => (
            <div key={index} className={`${card.lightBg} backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className='text-3xl font-bold text-white mb-2'>{card.value}</p>
                  <p className='text-gray-300 font-medium text-sm'>{card.title}</p>
                </div>
                <div className={`bg-gradient-to-r ${card.bgColor} p-3 rounded-xl shadow-lg`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Events Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Recent Events</h2>
              <p className="text-gray-400 text-sm">Latest events in your system</p>
            </div>
          </div>

          {/* Events Table */}
          <div className='relative overflow-x-auto rounded-xl border border-white/10'>
            <table className='w-full text-sm'>
              <thead className='bg-gradient-to-r from-slate-800 to-slate-700 text-white'>
                <tr>
                  <th scope='col' className='px-6 py-4 text-left font-semibold'>#</th>
                  <th scope='col' className='px-6 py-4 text-left font-semibold'>Event Name</th>
                  <th scope='col' className='px-6 py-4 text-left font-semibold max-sm:hidden'>Program</th>
                  <th scope='col' className='px-6 py-4 text-left font-semibold max-sm:hidden'>Date</th>
                  <th scope='col' className='px-6 py-4 text-left font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentEvents.map((event, index) => (
                  <tr key={event.id} className="hover:bg-white/5 transition-colors">
                    <td className='px-6 py-4 text-gray-300 font-medium'>{index + 1}</td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='text-white font-medium'>{event.eventName}</p>
                        <p className='text-gray-400 text-sm max-sm:hidden'>{event.venue}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-300 max-sm:hidden'>{event.programName}</td>
                    <td className='px-6 py-4 text-gray-300 max-sm:hidden'>{event.date}</td>
                    <td className='px-6 py-4'>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
                        {event.participationType === 'team' ? 'Team Event' : 'Individual'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {recentEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
              <p className="text-gray-400">Start by adding your first event to see it here.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
       

      </div>
    </div>
  )
}

export default TeacherDashboard