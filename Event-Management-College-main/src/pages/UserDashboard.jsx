import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { EVENTDATAS } from "../Constants/ProgramData";

const STORAGE_KEY = "user_ratings";

const UserDashboard = () => {
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

  // Mock user data - in real app this would come from authentication context
  const mockUserData = {
    registeredEvents: [1, 2, 3, 4], // Event IDs the user has registered for
    attendanceHistory: [
      { eventId: 1, attended: true },
      { eventId: 2, attended: true },
      { eventId: 3, attended: false },
      { eventId: 4, attended: true },
    ]
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    // Filter events that user has registered for
    const userRegisteredEvents = EVENTDATAS.filter(event =>
      mockUserData.registeredEvents.includes(event.id)
    );

    // Calculate stats
    const now = new Date();
    const upcoming = userRegisteredEvents.filter(event =>
      new Date(event.date) > now
    ).length;

    const completed = userRegisteredEvents.filter(event =>
      new Date(event.date) <= now
    ).length;

    const attendedEvents = mockUserData.attendanceHistory.filter(record => record.attended).length;
    const attendancePercentage = mockUserData.registeredEvents.length > 0
      ? Math.round((attendedEvents / mockUserData.registeredEvents.length) * 100)
      : 0;

    setUserStats({
      totalEvents: userRegisteredEvents.length,
      upcomingEvents: upcoming,
      completedEvents: completed,
      attendancePercentage: attendancePercentage,
    });

    // Add attendance status to events
    const eventsWithAttendance = userRegisteredEvents.map(event => {
      const attendanceRecord = mockUserData.attendanceHistory.find(record => record.eventId === event.id);
      return {
        ...event,
        attended: attendanceRecord ? attendanceRecord.attended : false,
        isUpcoming: new Date(event.date) > now,
      };
    });

    setRegisteredEvents(eventsWithAttendance);
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
      r => r.eventId === eventId && r.userId === "currentUser" // In real app, use actual user ID
    );

    const newRating = {
      id: Date.now().toString(),
      eventId: eventId,
      userId: "currentUser", // In real app, use actual user ID
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">User Dashboard</h1>
          <p className="text-gray-400">Track your event participation and provide feedback</p>
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
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.isUpcoming
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
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Rating Button */}
                  {!event.isUpcoming && (
                    <button
                      onClick={() => setRatingModal(event)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      Rate This Event
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

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
