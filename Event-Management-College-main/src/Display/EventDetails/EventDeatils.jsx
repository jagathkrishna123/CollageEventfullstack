import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiLocationPlus } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isTeacher = user.userType === "teacher";

  // 🔹 individual confirmation popup
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Fetch events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem("all_events") || "[]");
    const foundEvent = savedEvents.find((e) => e.id === Number(id));
    setEvent(foundEvent);
  }, [id]);

  const handleRegister = () => {
    if (!event) return;

    if (isTeacher) {
      toast.warning("Teachers are not allowed to register for events.");
      return;
    }

    if (event.participationType === "individual") {
      setShowConfirm(true);
    } else {
      // For team events, navigate to a team registration page if it exists
      // For now, let's just confirm too or redirect
      // Keeping original logic: navigate(`/event/${event.id}/register`);
      // Since team registration page might not be set up with local storage yet, 
      // I'll leave the navigation as is, assuming user will handle that next or it's a placeholder.
      navigate(`/event/${event.id}/register`);
    }
  };

  const handleConfirmIndividual = () => {
    setShowConfirm(false);

    // Get current user info if available
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Create registration object
    const registrationData = {
      id: Date.now(),
      eventId: event.id,
      eventName: event.eventName,
      participationType: "individual",
      date: new Date().toISOString(),
      userId: user.id || null, // Link to user if logged in
      userEmail: user.email || null,
      registeredBy: user.name || "Guest",
      status: "confirmed"
    };

    // Save to localStorage
    const existingRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]");

    // Check if checks if already registered to avoid duplicates?
    // Good idea to add a simple check
    const isAlreadyRegistered = existingRegistrations.some(
      r => String(r.userId) === String(user.id) && Number(r.eventId) === Number(event.id)
    );

    if (isAlreadyRegistered) {
      toast.info("You are already registered for this event.");
      return;
    }

    localStorage.setItem("event_registrations", JSON.stringify([...existingRegistrations, registrationData]));

    toast.success("Successfully Registered");
    // Ideally, save registration to localStorage here
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#03050F] via-[#0a0d1f] to-[#03050F] flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-medium animate-pulse">Loading event details...</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-blue-400 hover:text-blue-300 underline">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-br from-[#03050F] via-[#0a0d1f] to-[#03050F] text-white font-out relative overflow-hidden pt-20 pb-20 px-5 transition-all duration-300 ${showConfirm ? "blur-sm" : ""
          }`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ================= HERO ================= */}
          <div className="relative rounded-3xl overflow-hidden mb-16 mt-8 shadow-2xl shadow-blue-500/10">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-75 blur-xl"></div>

            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={event.poster || "https://via.placeholder.com/1200x500"}
                alt={event.eventName}
                className="w-full h-[420px] md:h-[480px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 flex items-center gap-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                {event.participationType === 'team' ? 'Team Event' : 'Individual Event'}
              </div>

              <div className="absolute bottom-8 left-8 max-w-3xl">
                <p className="text-blue-400 font-bold uppercase tracking-wide text-sm mb-2">
                  {event.programName}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                  {event.eventName}
                </h1>
                <p className="text-gray-200 mt-4 text-lg leading-relaxed max-w-2xl">
                  {event.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">

              {/* About Section */}
              <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      About This Event
                    </h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    This event is organized by the{" "}
                    <span className="text-blue-400 font-semibold">{event.department}</span>{" "}
                    department and coordinated by{" "}
                    <span className="text-purple-400 font-semibold">{event.incharge}</span>.
                  </p>
                </div>
              </section>

              {/* Event Details Section */}
              <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Event Details
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Detail label="Date" value={event.date} icon="calendar" />
                    <Detail label="Time" value={`${event.startTime} - ${event.endTime}`} icon="clock" />
                    <Detail label="Venue" value={event.venue} icon="location" />
                    <Detail label="Participant Limit" value={event.limit} icon="users" />
                    <Detail label="Participation Type" value={event.participationType} icon="type" />
                  </div>
                </div>
              </section>

              {/* Participation Rules Section */}
              <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Participation Rules
                    </h2>
                  </div>

                  {event.participationType === "individual" && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Detail label="Overall Individual Limit" value={event.overallIndividualLimit} icon="users" />
                      <Detail label="Participants Per Department" value={event.departmentIndividualLimit} icon="user" />
                    </div>
                  )}

                  {event.participationType === "team" && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Detail label="Teams Per Department" value={event.teamsPerDepartment} icon="users" />
                      <Detail label="Members Per Team" value={event.membersPerTeamFromDepartment} icon="user" />
                    </div>
                  )}
                </div>
              </section>

              {/* Prizes Section */}
              {event.priceImage && (
                <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Prizes & Rewards
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl opacity-75 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                        <img src={event.priceImage} alt="Prize Details" className="relative max-w-full md:max-w-md rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Sponsors Section */}
              {event.sponsorImages?.length > 0 && (
                <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Our Sponsors
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {event.sponsorImages.map((img, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-500/50 transition-all duration-300 p-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img src={img} alt={`Sponsor ${i + 1}`} className="relative max-h-20 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Location Section */}
              <section className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/20 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <FaLocationDot className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Location & Venue
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <Detail label="Latitude" value={event.latitude} icon="map" />
                    <Detail label="Longitude" value={event.longitude} icon="map" />
                  </div>

                  <a
                    href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                    target="_blank"
                    className="group/btn inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-1"
                  >
                    <BiLocationPlus className="text-lg group-hover/btn:scale-110 transition-transform" />
                    Open in Google Maps
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR - Registration Card */}
            <div className="sticky top-28 space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 shadow-2xl shadow-blue-500/10 p-8">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-50 blur-xl"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                      Ready to Join?
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Don't miss out on this amazing opportunity!
                    </p>
                  </div>

                  {new Date(event.date) < new Date().setHours(0, 0, 0, 0) ? (
                    <div className="w-full py-4 rounded-2xl bg-gray-800/50 border border-white/10 text-gray-500 font-bold text-center uppercase tracking-widest">
                      Registration Closed
                    </div>
                  ) : isTeacher ? (
                    <div className="w-full py-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-center uppercase tracking-widest">
                      Student Event Only
                    </div>
                  ) : (
                    <button
                      onClick={handleRegister}
                      className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 font-semibold text-lg text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Register Now</span>
                    </button>
                  )}

                  {/* Quick Info */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Event Type:</span>
                      <span className="text-white font-medium capitalize">{event.participationType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Max Participants:</span>
                      <span className="text-white font-medium">{event.limit || "Unlimited"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Starts:</span>
                      <span className="text-white font-medium">{event.startTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONFIRMATION POPUP ================= */}
      {showConfirm && (
        <ConfirmationPopup
          onConfirm={handleConfirmIndividual}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

const Detail = ({ label, value, icon }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'calendar':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'clock':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'location':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />;
      case 'users':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />;
      case 'user':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
      case 'type':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z" />;
      case 'map':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />;
      default:
        return null;
    }
  };

  return (
    <div className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
      {icon && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getIcon(icon)}
          </svg>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 font-medium mb-1">{label}</p>
        <p className="text-white font-semibold text-base break-words">{value || "-"}</p>
      </div>
    </div>
  );
};

/* CONFIRMATION POPUP */
const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl border border-white/10 max-w-md w-full">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-50 blur-xl"></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
          Confirm Registration
        </h2>
        <p className="text-gray-300 text-sm mb-8">
          Are you sure you want to register for this eventx?
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EventDetails;
