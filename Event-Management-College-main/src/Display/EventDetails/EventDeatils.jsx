import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EVENTDATAS } from "../../Constants/ProgramData";
import { BiLocationPlus } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = EVENTDATAS.find((e) => e.id === Number(id));
    setEvent(foundEvent);
  }, [id]);

  const handleRegister = () => {
    alert(`Registered for ${event.eventName}`);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-gray-400">
        Loading event...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-20 pb-20 px-5">
      <div className="max-w-7xl mx-auto">

        {/* ================= HERO ================= */}
        <div className="relative rounded-3xl overflow-hidden mb-16 mt-20">
          <img
            src={event.image}
            alt={event.eventName}
            className="w-full h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          <div className="absolute bottom-10 left-8 max-w-3xl">
            <p className="text-blue-400 font-semibold uppercase tracking-wide">
              {event.programName}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              {event.eventName}
            </h1>
            <p className="text-gray-300 mt-4">
              {event.description}
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">

            {/* ABOUT */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed">
                This event is organized by the {event.department} department and
                coordinated by {event.incharge}. Participants will gain hands-on
                experience and exposure to real-world challenges.
              </p>
            </section>

            {/* EVENT DETAILS */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Event Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Detail label="Date" value={event.date} />
                <Detail
                  label="Time"
                  value={`${event.startTime} - ${event.endTime}`}
                />
                <Detail label="Venue" value={event.venue} />
                <Detail label="Participant Limit" value={event.limit} />
              </div>
            </section>

            {/* LOCATION */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-semibold">Location</h2>
                <FaLocationDot className="text-xl text-blue-500" />
              </div>

              <div className="flex flex-col sm:flex-row gap-10 text-gray-300 mb-6">
                <Detail label="Latitude" value={event.latitude} />
                <Detail label="Longitude" value={event.longitude} />
              </div>

              {/* GOOGLE MAP LINK */}
              <a
                href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-5 py-3
                  rounded-xl
                  bg-blue-600/20 text-blue-400
                  border border-blue-500/30
                  hover:bg-blue-600/30
                  hover:text-blue-300
                  transition
                "
              >
                <BiLocationPlus className="text-lg" />
                Open Location in Google Maps
              </a>
            </section>
          </div>

          {/* RIGHT STICKY CARD */}
          <div className="relative">
            <div className="sticky top-28 bg-gradient-to-br from-[#1E293B] to-[#020617] border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">

              <h3 className="text-2xl font-semibold">
                Ready to Join?
              </h3>

              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <span className="text-gray-400">Department:</span>{" "}
                  {event.department}
                </p>
                <p>
                  <span className="text-gray-400">In-charge:</span>{" "}
                  {event.incharge}
                </p>
                <p>
                  <span className="text-gray-400">Venue:</span>{" "}
                  {event.venue}
                </p>
              </div>

              <button
                onClick={handleRegister}
                className="
                  w-full py-4 rounded-xl
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  font-semibold text-lg
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
                  transition-all duration-300
                "
              >
                Register Now
              </button>

              <p className="text-xs text-gray-400 text-center">
                Limited seats available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium text-white">{value}</p>
  </div>
);

export default EventDetails;
