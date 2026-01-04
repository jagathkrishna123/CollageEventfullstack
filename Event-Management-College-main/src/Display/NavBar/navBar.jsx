import Logo2 from "../../assets/logo2.png";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { HiOutlineMenu, HiX, HiOutlineBell, HiOutlineUser } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Added Framer Motion
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { CircleUserRound } from "lucide-react";
// import Logo2 from "../assets/logo2.png"

export function NavBar() {
  const [mobileView, setMobileView] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count
  const { user, setUser } = useAppContext();

  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, [setUser]);
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
          
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center justify-center gap-8 px-8 py-4 bg-slate-600 backdrop-blur-sm border border-gray-600 rounded-2xl shadow-2xl shadow-purple-500/20">
              <div className="group cursor-pointer relative">
                <Link
                  to="/"
                  className="font-sans font-light text-white font-lexend text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Home
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <Link
                  to="/dashboard"
                  className="font-sans font-light font-lexend text-white text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Dashboard
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <Link
                  to="/reports"
                  className="font-sans font-light font-lexend text-white text-[16px] transition-colors group-hover:text-purple-300"
                >
                  Reports
                </Link>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>

              <div className="group cursor-pointer relative">
                <h3 className="font-sans font-light font-lexend text-white text-[16px] transition-colors group-hover:text-purple-300">
                  About
                </h3>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>
            </div>

            {/* Right Section - Icons & User Menu */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Bell Icon with Notification Badge */}
              <div className="relative cursor-pointer group">
                <HiOutlineBell strokeWidth={1} size={28}
                  className="text-white text-2xl hover:text-purple-300 transition-colors duration-200"
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs  rounded-full border-1 border-gray-600">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </div>

              {/* Profile Icon */}
              <div
                onClick={() => user ? navigate("/dashboard") : navigate("/login")}
                className="cursor-pointer group"
              >
                <CircleUserRound strokeWidth={1} size={28}
                  className="text-white text-2xl hover:text-purple-300 transition-colors duration-200"
                />
              </div>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center gap-3 ml-2">
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-white font-light text-sm whitespace-nowrap">
                      Welcome, {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      // Clear user data
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      localStorage.removeItem("userType");
                      setUser(null);
                      toast.success("Logged out successfully!");
                      navigate("/");
                    }}
                    className="
                      flex items-center justify-center gap-2
                      px-4 py-2 h-[40px]
                      bg-blue-600 hover:bg-blue-700
                      text-white rounded-lg
                      font-medium text-sm
                      transition-all duration-200
                      cursor-pointer
                      shadow-md hover:shadow-lg
                    "
                  >
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">×</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="
                    flex items-center justify-center gap-2
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
                    Login
                  </h3>
                </button>
              )}
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

              {/* Mobile Menu Items */}
              <div className="flex flex-col space-y-1 text-white font-medium text-lg px-6 py-4">
                <Link
                  to="/"
                  onClick={() => setMobileView(false)}
                  className="py-3 px-3 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileView(false)}
                  className="py-3 px-3 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/reports"
                  onClick={() => setMobileView(false)}
                  className="py-3 px-3 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Reports
                </Link>
                <button className="py-3 px-3 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  About Us
                </button>
                <button className="py-3 px-3 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  Events
                </button>
                <button className="py-3 px-3 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  Gallery
                </button>
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-gray-700 mt-4 pt-4 px-6">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaRegUserCircle className="text-white text-2xl" />
                      </div>
                      <p className="text-white font-medium text-sm">
                        Welcome, {user.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {user.userType === 'student' ? 'Student' : 'Teacher'}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setMobileView(false);
                        }}
                        className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          // Clear user data
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          localStorage.removeItem("userType");
                          setUser(null);
                          setMobileView(false);
                          toast.success("Logged out successfully!");
                          navigate("/");
                        }}
                        className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Notification & Profile Icons */}
                    <div className="flex items-center justify-center gap-6 py-2">
                      <div className="relative cursor-pointer">
                        <HiOutlineBell className="text-white text-2xl" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-gray-900">
                            {notificationCount > 99 ? '99+' : notificationCount}
                          </span>
                        )}
                      </div>
                      <div
                        onClick={() => {
                          navigate("/login");
                          setMobileView(false);
                        }}
                        className="cursor-pointer"
                      >
                        <FaRegUserCircle className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Login Button */}
                    <Link
                      to="/login"
                      onClick={() => setMobileView(false)}
                      className="w-full py-3 px-4 text-black bg-white font-semibold rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
