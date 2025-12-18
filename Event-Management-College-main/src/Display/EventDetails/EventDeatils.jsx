import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENTDATAS } from "../../Constants/ProgramData";

const EventDeatils = () => {
  const { id } = useParams();
  const [showEventDetail, setShowEventDetail] = useState(null);

  useEffect(() => {
    const selectedEventItem = EVENTDATAS.find(
      (item) => item.id === Number(id)
    );
    setShowEventDetail(selectedEventItem);
  }, [id]);

  if (!showEventDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03050F] pt-20 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        {showEventDetail.eventName}
      </h1>

      <img
        src={showEventDetail.image}
        alt={showEventDetail.eventName}
        className="w-full max-w-xl rounded-xl mb-6"
      />

      <p className="text-gray-300 mb-2">
        <strong>Department:</strong> {showEventDetail.department}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Venue:</strong> {showEventDetail.venue}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Date:</strong> {showEventDetail.date}
      </p>

      <p className="text-gray-200 leading-relaxed mt-4">
        {showEventDetail.description}
      </p>
    </div>
  );
};

export default EventDeatils;

