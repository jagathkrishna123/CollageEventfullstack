import React from 'react'
import { MdOutlineAddBox } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
// import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-400'>
        <NavLink end={true} to='/teacher' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bbg-cyan-800 border-r-4 border-primary"}`}>
            {/* <img src={assets.home_icon} alt="" className='min-w-4 w-5' /> */}
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink  to='/teacher/teacher-add-program' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
                   <MdOutlineAddBox className='text-[18px]' />
                    <p className='hidden md:inline-block'>Add Program</p>
        </NavLink>

        <NavLink  to='/teacher/addevent' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            {/* <img src={assets.add_icon} alt="" className='min-w-4 w-5' /> */}
            <p className='hidden md:inline-block'>Add Event</p>
        </NavLink>

        <NavLink  to='/teacher/feedback' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            {/* <img src={assets.list_icon} alt="" className='min-w-4 w-5' /> */}
            <p className='hidden md:inline-block'>Feedback</p>
        </NavLink>

        <NavLink  to='/teacher/attendence' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            {/* <img src={assets.comment_icon} alt="" className='min-w-4 w-5' /> */}
            <p className='hidden md:inline-block'>Attendance</p>
        </NavLink>

        <NavLink  to='/teacher/registrations' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            {/* <img src={assets.comment_icon} alt="" className='min-w-4 w-5' /> */}
            <p className='hidden md:inline-block'>Registrations</p>
        </NavLink>
    </div>
  )
}

export default Sidebar