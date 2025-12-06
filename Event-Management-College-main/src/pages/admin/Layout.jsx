import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900">

            {/* Header */}
            <div className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-700">
                <button 
                    onClick={logout} 
                    className="text-sm px-8 py-2 bg-blue-800 text-white rounded-full cursor-pointer"
                >
                    Logout
                </button>
            </div>

            {/* Main layout (NO HEIGHT LIMIT) */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />

                {/* PAGE CONTENT */}
                <div className="flex-1 p-8 overflow-visible">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
