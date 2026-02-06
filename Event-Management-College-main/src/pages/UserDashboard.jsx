import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const STORAGE_KEY = "user_ratings";
const ATTENDANCE_KEY = "event_attendance";

const UserDashboard = () => {
  const { user } = useAppContext();

  const [userStats, setUserStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    attendancePercentage: 0,
  });

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  /* New State for Attendance Modal */
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = () => {
    // Fetch all required data from localStorage
    const allEvents = JSON.parse(localStorage.getItem("all_events") || "[]");
    const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]");
    const attendanceRecords = JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || "[]");

    // Filter registrations for this user
    // Assuming registrations stored userId or we match by some other unique prop if needed
    // In EventRegistration we saved: userId: user.id
    const myRegistrations = allRegistrations.filter(
      reg =>
        String(reg.userId) === String(user.id) ||
        reg.userEmail === user.email ||
        (reg.teamData?.members?.some(m => m.regNo === user.registerNumber))
    );

    // Map registrations to full event details
    const myEvents = myRegistrations.map(reg => {
      const eventDetails = allEvents.find(e => e.id === Number(reg.eventId));
      if (!eventDetails) return null;

      // Check attendance
      const attendanceRecord = attendanceRecords.find(
        att => String(att.userId) === String(user.id) && Number(att.eventId) === Number(reg.eventId)
      );

      const isAttended = !!attendanceRecord;
      const attendanceStatus = attendanceRecord?.status || (isAttended ? 'approved' : null);

      return {
        ...eventDetails,
        registrationDate: reg.date,
        attended: isAttended,
        attendanceStatus: attendanceStatus, // 'pending' or 'approved'
        isUpcoming: new Date(eventDetails.date) > new Date()
      };
    }).filter(Boolean); // Remove nulls if event not found

    // Calculate stats
    const now = new Date();
    const upcoming = myEvents.filter(e => e.isUpcoming).length;
    const completed = myEvents.filter(e => !e.isUpcoming).length;
    // Count as "attended" only if approved or just count all submissions? 
    // For now counting all for stats, or maybe just approved? 
    // Let's count all non-null attendance for now to reflect activity.
    const attendedCount = myEvents.filter(e => e.attended).length;

    // Attendance percentage based on COMPLETED events (events that have passed)
    // or based on total registered? Usually based on total registered makes sense for dashboard
    const attendancePercentage = myEvents.length > 0
      ? Math.round((attendedCount / myEvents.length) * 100)
      : 0;

    setUserStats({
      totalEvents: myEvents.length,
      upcomingEvents: upcoming,
      completedEvents: completed,
      attendancePercentage: attendancePercentage,
    });

    setRegisteredEvents(myEvents);
  };

  const handleAttendance = (eventId) => {
    const records = JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || "[]");

    // Prevent duplicate attendance
    const alreadyMarked = records.some(
      r => String(r.userId) === String(user.id) && Number(r.eventId) === Number(eventId)
    );

    if (alreadyMarked) {
      toast.info("Attendance already submitted.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      userId: user.id,
      eventId: Number(eventId),
      date: new Date().toISOString(),
      status: 'pending' // Mark as pending
    };

    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify([...records, newRecord]));
    // toast.success("Attendance marked successfully!"); // Removed toast in favor of modal

    // Show Modal
    setShowAttendanceModal(true);

    // Refresh data
    loadUserData();
  };

  const handleRatingSubmit = (eventId) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    // Get existing ratings
    const existingRatings = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    // Check if user already rated this event
    const existingRatingIndex = existingRatings.findIndex(
      r => Number(r.eventId) === Number(eventId) && String(r.userId) === String(user.id)
    );

    const newRating = {
      id: Date.now().toString(),
      eventId: eventId,
      userId: user.id,
      rating: rating,
      review: review,
      eventName: ratingModal.eventName,
      createdAt: new Date().toISOString(),
    };

    if (existingRatingIndex !== -1) {
      // Update existing rating
      existingRatings[existingRatingIndex] = newRating;
    } else {
      // Add new rating
      existingRatings.push(newRating);
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRatings));

    // Close modal and reset
    setRatingModal(null);
    setRating(0);
    setReview("");

    toast.success("Rating submitted successfully!");
  };

  const StarRating = ({ value, onChange, readonly = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onChange(star)}
            className={`text-2xl ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <span className={star <= value ? "text-yellow-400" : "text-gray-400"}>
              ★
            </span>
          </button>
        ))}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Please login to view dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">User Dashboard</h1>
          <p className="text-gray-400">Welcome, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-blue-400 mb-2">{userStats.totalEvents}</div>
            <div className="text-gray-300">Total Events</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-green-400 mb-2">{userStats.upcomingEvents}</div>
            <div className="text-gray-300">Upcoming Events</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.completedEvents}</div>
            <div className="text-gray-300">Completed Events</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">{userStats.attendancePercentage}%</div>
            <div className="text-gray-300">Attendance Rate</div>
          </motion.div>
        </div>

        {/* Registered Events */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Your Registered Events</h2>

          {registeredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No registered events yet</p>
              <p className="text-gray-500 text-sm mt-2">Register for events to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {event.eventName}
                      </h3>
                      <p className="text-gray-400 text-sm">{event.programName}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${event.isUpcoming
                        ? 'bg-blue-500/20 text-blue-400'
                        : event.attended
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                        }`}>
                        {event.isUpcoming ? 'Upcoming' : event.attended ? 'Attended' : 'Missed'}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>📅</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>🕒</span>
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>📍</span>
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>🏷️</span>
                      <span className="capitalize">{event.participationType}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    {/* Attendance Button */}
                    {!event.isUpcoming && (
                      <button
                        onClick={() => handleAttendance(event.id)}
                        disabled={event.attended}
                        className={`flex-1 py-2 rounded-lg font-medium transition ${event.attended
                          ? 'bg-yellow-600/50 text-white cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                      >
                        {event.attended
                          ? (event.attendanceStatus === 'pending' ? 'Pending Approval' : 'Attended ✓')
                          : 'Mark Attendance'}
                      </button>
                    )}

                    {/* Rating Button */}
                    {!event.isUpcoming && (
                      <button
                        onClick={() => setRatingModal(event)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                      >
                        Rate
                      </button>
                    )}
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attendance Confirmation Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border border-white/10"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Success</h3>
            <p className="text-gray-300 mb-6">Attendance submitted. Waiting for teacher approval.</p>
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Rate Event</h3>
            <p className="text-gray-300 mb-4">{ratingModal.eventName}</p>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Your Rating</label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* Review */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Review (Optional)</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleRatingSubmit(ratingModal.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Submit Rating
              </button>
              <button
                onClick={() => {
                  setRatingModal(null);
                  setRating(0);
                  setReview("");
                }}
                className="px-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
