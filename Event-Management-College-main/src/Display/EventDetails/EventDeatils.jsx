import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EVENTDATAS } from "../../Constants/ProgramData";
import { BiLocationPlus } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  // 🔹 individual confirmation popup
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const foundEvent = EVENTDATAS.find((e) => e.id === Number(id));
    setEvent(foundEvent);
  }, [id]);

  const handleRegister = () => {
    if (event.participationType === "individual") {
      setShowConfirm(true); // ✅ show popup here itself
    } else {
      navigate(`/event/${event.id}/register`);
    }
  };

  const handleConfirmIndividual = () => {
    setShowConfirm(false);
    toast.success("Successfully Registered 🎉");
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-gray-400">
        Loading event...
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen bg-[#020617] text-white pt-20 pb-20 px-5 transition ${
          showConfirm ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">

          {/* ================= HERO ================= */}
          <div className="relative rounded-3xl overflow-hidden mb-16 mt-20">
            <img
              src={event.poster}
              alt={event.eventName}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            <div className="absolute bottom-10 left-8 max-w-3xl">
              <p className="text-blue-400 font-bold uppercase tracking-wide text-xl">
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

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-10">

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p className="text-gray-300">
                  This event is organized by the <b>{event.department}</b>{" "}
                  department and coordinated by <b>{event.incharge}</b>.
                </p>
              </section>

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Detail label="Date" value={event.date} />
                  <Detail label="Time" value={`${event.startTime} - ${event.endTime}`} />
                  <Detail label="Venue" value={event.venue} />
                  <Detail label="Participant Limit" value={event.limit} />
                  <Detail label="Participation Type" value={event.participationType} />
                </div>
              </section>

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Participation Rules</h2>

                {event.participationType === "individual" && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Detail label="Overall Individual Limit" value={event.overallIndividualLimit} />
                    <Detail label="Participants Per Department" value={event.departmentIndividualLimit} />
                  </div>
                )}

                {event.participationType === "team" && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Detail label="Teams Per Department" value={event.teamsPerDepartment} />
                    <Detail label="Members Per Team" value={event.membersPerTeamFromDepartment} />
                  </div>
                )}
              </section>

              {event.priceImage && (
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-4">Prizes</h2>
                  <img src={event.priceImage} className="max-w-md rounded-xl" />
                </section>
              )}

              {event.sponsorImages?.length > 0 && (
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Sponsors</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {event.sponsorImages.map((img, i) => (
                      <img key={i} src={img} className="h-24 bg-white p-3 rounded-xl object-contain" />
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  Location <FaLocationDot className="text-blue-500" />
                </h2>
                <div className="flex gap-10 mb-6">
                  <Detail label="Latitude" value={event.latitude} />
                  <Detail label="Longitude" value={event.longitude} />
                </div>

                <a
                  href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                  target="_blank"
                  className="inline-flex gap-2 px-5 py-3 rounded-xl bg-blue-600/20 text-blue-400"
                >
                  <BiLocationPlus /> Open Location in Google Maps
                </a>
              </section>
            </div>

            {/* RIGHT CARD */}
            <div className="sticky top-28 bg-gradient-to-br from-[#1E293B] to-[#020617] border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-2xl font-semibold">Ready to Join?</h3>

              <button
                onClick={handleRegister}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold text-lg"
              >
                Register Now
              </button>
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

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium text-white">{value || "-"}</p>
  </div>
);

/* CONFIRMATION POPUP */
const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#020617] p-8 rounded-2xl text-center space-y-4">
      <h2 className="text-xl font-semibold">Confirm Registration?</h2>
      <div className="flex gap-4 justify-center">
        <button onClick={onCancel} className="px-6 py-2 bg-gray-700 rounded">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-6 py-2 bg-blue-600 rounded">
          OK
        </button>
      </div>
    </div>
  </div>
);

export default EventDetails;
