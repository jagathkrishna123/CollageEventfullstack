import Logo2 from "../../assets/logo2.png";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { HiOutlineMenu, HiX, HiOutlineBell, HiOutlineUser } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Added Framer Motion
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
// import { useAppContext } from "../../context/AppContext";
// import Logo2 from "../assets/logo2.png"

export function NavBar() {
  const [mobileView, setMobileView] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count
    // const {user, setUser, setShowUserLogin, navigate} = useAppContext();

  const navigate = useNavigate();
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className=" max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-10 flex-wrap">
        <div className="flex items-center justify-between w-full flex-wrap pt-4">
          {/* Logo Section */}
          <div onClick={() => navigate("/")} className="flex items-center w-[205px] h-[70px] cursor-pointer">
            <div className="flex items-center h-[66px]">
              <img src={Logo2} alt="Logo" className="w-[50px]" />
            </div>
            <div className="flex items-center justify-center">
              <h2 className="font-sans font-bold text-white text-[27px]">
                DOCKET
              </h2>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between w-[900px] flex-row flex-wrap">
            <div className="flex items-center justify-center gap-8 px-8 py-4 flex-row w-[680px] h-auto flex-wrap bg-slate-600 backdrop-blur-sm border border-gray-600 rounded-2xl shadow-2xl shadow-purple-500/20">
              <div className="group cursor-pointer relative">
                <Link
                  to="/"
                  className="font-sans font-medium text-white text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Home
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <Link
                  to="/dashboard"
                  className="font-sans font-medium text-white text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Dashboard
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <Link
                  to="/reports"
                  className="font-sans font-medium text-white text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Reports
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <h3 className="font-sans font-medium text-white text-[16px] transition-colors group-hover:text-purple-300">
                  About
                </h3>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>
              
              
            </div>
            
            {/* Icons Section */}
            <div className="flex items-center gap-4">
              {/* Bell Icon with Notification Badge */}
              <div className="relative cursor-pointer group">
                <HiOutlineBell 
                  className="text-white text-2xl hover:text-purple-300 transition-colors duration-200" 
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border border-gray-900">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </div>

              {/* Profile Icon */}
              <div 
                onClick={() => navigate("/login")}
                className="cursor-pointer group"
              >
                <FaRegUserCircle 
                  className="text-white text-2xl hover:text-purple-300 transition-colors duration-200" 
                />
              </div>

              {/* Logout Button */}
              <div
                onClick={() => navigate("/login")}
                className="
                  relative flex items-center justify-center gap-2
                  px-6 py-2.5 h-[40px]
                  bg-blue-600 hover:bg-blue-700
                  text-white rounded-lg
                  font-medium
                  transition-all duration-200
                  cursor-pointer
                  shadow-md hover:shadow-lg
                "
              >
                <h3 className="font-sans text-[16px]">
                  Logout
                </h3>
              </div>
            </div>
 
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center justify-center text-white">
            {mobileView ? (
              <HiX
                className="text-3xl cursor-pointer"
                onClick={() => setMobileView(false)}
              />
            ) : (
              <HiOutlineMenu
                className="text-3xl cursor-pointer"
                onClick={() => setMobileView(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu (Animated) */}
        <AnimatePresence>
          {mobileView && (
            <motion.div
              key="mobileMenu"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="fixed top-0 right-0 w-2/3 h-full bg-black shadow-lg z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end p-4">
                <HiX
                  className="text-white text-3xl cursor-pointer"
                  onClick={() => setMobileView(false)}
                />
              </div>

              <div className="flex flex-col space-y-2 text-white font-semibold text-lg px-6">
                <Link
                  to="/"
                  onClick={() => setMobileView(false)}
                  className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileView(false)}
                  className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition"
                >
                  Dashboard
                </Link>
                <h1 className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition">
                  About Us
                </h1>
                <Link
                  to="/reports"
                  onClick={() => setMobileView(false)}
                  className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition"
                >
                  Reports
                </Link>
                <h1 className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition">
                  Events
                </h1>
                <h1 className="py-2 border-b border-gray-700 hover:bg-gray-800 rounded px-2 cursor-pointer transition">
                  Gallery
                </h1>
              </div>

              {/* Mobile Icons */}
              <div className="flex items-center justify-center gap-6 px-6 py-4">
                {/* Bell Icon with Notification Badge */}
                <div className="relative cursor-pointer">
                  <HiOutlineBell className="text-white text-2xl" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-gray-900">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </div>

                {/* Profile Icon */}
                <div 
                  onClick={() => {
                    navigate("/login");
                    setMobileView(false);
                  }}
                  className="cursor-pointer"
                >
                  <HiOutlineUser className="text-white text-2xl" />
                </div>
              </div>

              <div className="mt-auto p-6">
                <Link
                  to="/login"
                  className="w-full py-2 px-4 text-black bg-white font-semibold rounded hover:bg-gray-100 transition flex items-center justify-center"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
