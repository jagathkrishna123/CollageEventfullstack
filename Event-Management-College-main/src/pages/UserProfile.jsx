import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { SIGNUPDATA } from '../Constants/ProgramData';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaGraduationCap, FaChalkboardTeacher, FaVenusMars, FaBook } from 'react-icons/fa';

const UserProfile = () => {
    const { user, setUser } = useAppContext();
    const [profileImage, setProfileImage] = useState(null);
    const [displayUser, setDisplayUser] = useState(null);

    useEffect(() => {
        if (user) {
            setDisplayUser(user);
        } else {
            // Fallback for development/testing if no user is logged in
            // Default to the first student in SIGNUPDATA
            const mockUser = SIGNUPDATA.find(u => u.userType === 'student') || SIGNUPDATA[0];
            setDisplayUser(mockUser);
        }
    }, [user]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            // In a real app, you would upload this file to a server here
        }
    };

    if (!displayUser) {
        return <div className="text-white text-center p-10">Loading profile...</div>;
    }

    const isStudent = displayUser.userType === 'student';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-6 md:p-12 font-out">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mt-20">

                    {/* Header / Cover Area */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                        <div className="absolute -bottom-16 left-8 md:left-12">
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-900 overflow-hidden bg-gray-800">
                                    {profileImage || displayUser.image ? (
                                        <img
                                            src={profileImage || displayUser.image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                                            <FaUser className="w-16 h-16" />
                                        </div>
                                    )}
                                </div>

                                {/* Image Upload Button */}
                                <label className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all transform group-hover:scale-110">
                                    <FaCamera className="w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-8 pb-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{displayUser.name}</h1>
                                <p className="text-blue-400 font-medium capitalize flex items-center gap-2">
                                    {isStudent ? <FaGraduationCap /> : <FaChalkboardTeacher />}
                                    {displayUser.userType}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all font-medium">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Personal Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Email</p>
                                            <p className="font-medium">{displayUser.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Mobile</p>
                                            <p className="font-medium">{displayUser.mobile}</p>
                                        </div>
                                    </div>

                                    {/* Teacher Specific: Gender */}
                                    {!isStudent && (
                                        <div className="flex items-center gap-4 text-gray-300">
                                            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                                <FaVenusMars />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Gender</p>
                                                <p className="font-medium">{displayUser.gender}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Academic / Professional Information */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">
                                    {isStudent ? 'Academic Information' : 'Professional Information'}
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                            <FaIdCard />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Register Number</p>
                                            <p className="font-medium">{displayUser.registerNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                                            <FaUniversity />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Department</p>
                                            <p className="font-medium">{displayUser.department}</p>
                                        </div>
                                    </div>

                                    {isStudent ? (
                                        <>
                                            <div className="flex items-center gap-4 text-gray-300">
                                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                    <FaBook />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Semester</p>
                                                    <p className="font-medium">{displayUser.semester}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-300">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                    <FaIdCard />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Admission Number</p>
                                                    <p className="font-medium">{displayUser.admissionNumber}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-4 text-gray-300">
                                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                    <FaChalkboardTeacher />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Designation</p>
                                                    <p className="font-medium">{displayUser.designation}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-300">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                    <FaGraduationCap />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Qualification</p>
                                                    <p className="font-medium">{displayUser.qualification}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;