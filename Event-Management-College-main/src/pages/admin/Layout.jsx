import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Logo2 from "../../assets/logo2.png";


const Layout = () => {
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-700">
               
                <div className="flex items-center w-[205px] h-[70px]">
                            <div className="flex items-center h-[66px]">
                              <img src={Logo2} alt="Logo" className="w-[50px]" />
                            </div>
                            <div className="flex items-center justify-center">
                              <h2 onClick={() => navigate("/")} className="font-sans font-bold text-white text-[27px] cursor-pointer">
                                DOCKET
                              </h2>
                            </div>
                          </div>

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
