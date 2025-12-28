import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { IoMdAddCircleOutline } from 'react-icons/io';
import { TbMessage } from 'react-icons/tb';
import { PiUserCheckBold } from 'react-icons/pi';
import { CgNotes } from 'react-icons/cg';


// import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-400'>
        <NavLink end={true} to='/admin' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bbg-cyan-800 border-r-4 border-primary"}`}>
            <MdOutlineSpaceDashboard />
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        
        <NavLink  to='/admin/admin-add-program' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
           <MdOutlineAddBox className='text-[18px]' />
            <p className='hidden md:inline-block'>Add Program</p>
        </NavLink>

        <NavLink  to='/admin/addevent' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <IoMdAddCircleOutline />
            <p className='hidden md:inline-block'>Add Event</p>
        </NavLink>
        <NavLink  to='/admin/manageprogram' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <IoMdAddCircleOutline />
            <p className='hidden md:inline-block'>Manage Program</p>
        </NavLink>

        <NavLink  to='/admin/feedback' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
           <TbMessage />
            <p className='hidden md:inline-block'>Feedback</p>
        </NavLink>

        <NavLink  to='/admin/attendence' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
           <PiUserCheckBold />
            <p className='hidden md:inline-block'>Attendance</p>
        </NavLink>

        <NavLink  to='/admin/registrations' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
           <CgNotes />
            <p className='hidden md:inline-block'>Registrations</p>
        </NavLink>
    </div>
  )
}

export default Sidebar
