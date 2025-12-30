import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EVENTDATAS } from "../../Constants/ProgramData";
import { toast } from "react-toastify";

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  // 🔹 popup states
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Team form state
  const [teamData, setTeamData] = useState({
    department: "",
    semester: "",
    members: [],
  });

  useEffect(() => {
    const foundEvent = EVENTDATAS.find((e) => e.id === Number(id));
    setEvent(foundEvent);

    if (foundEvent?.participationType === "team") {
      setTeamData({
        department: "",
        semester: "",
        members: Array.from(
          { length: foundEvent.membersPerTeamFromDepartment },
          () => ({ name: "", regNo: "" })
        ),
      });
    }
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Event not found
      </div>
    );
  }

  /* =========================
     INDIVIDUAL REGISTRATION
     ========================= */
  if (event.participationType === "individual") {
    return (
      <>
        <ConfirmationPopup
          onConfirm={() => {
            toast.success("Successfully Registered");
            navigate(-1);
          }}
          onCancel={() => navigate(-1)}
        />
      </>
    );
  }

  /* =========================
     TEAM REGISTRATION
     ========================= */
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index][field] = value;
    setTeamData({ ...teamData, members: updatedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true); // 🔹 show confirmation first
  };

  const handleConfirmRegistration = () => {
    setShowConfirm(false);

    // 🔹 backend call can go here
    console.log("Team Registration Data:", teamData);

    toast.success("Successfully Registered");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Team Registration
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          {event.eventName}
        </p>

        {/* Department */}
        <input
          type="text"
          placeholder="Department"
          className="w-full p-3 bg-gray-800 rounded outline-none"
          value={teamData.department}
          onChange={(e) =>
            setTeamData({ ...teamData, department: e.target.value })
          }
          required
        />

        {/* Semester */}
        <input
          type="text"
          placeholder="Semester"
          className="w-full p-3 bg-gray-800 rounded outline-none"
          value={teamData.semester}
          onChange={(e) =>
            setTeamData({ ...teamData, semester: e.target.value })
          }
          required
        />

        {/* MEMBERS */}
        <div className="space-y-4">
          {teamData.members.map((member, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={`Member ${index + 1} Name`}
                className="p-3 bg-gray-800 rounded outline-none"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Register Number"
                className="p-3 bg-gray-800 rounded outline-none"
                value={member.regNo}
                onChange={(e) =>
                  handleMemberChange(index, "regNo", e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold mt-4"
        >
          Submit Registration
        </button>
      </form>

      {/* CONFIRMATION POPUP */}
      {showConfirm && (
        <ConfirmationPopup
          onConfirm={handleConfirmRegistration}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

/* =========================
   CONFIRMATION POPUP
   ========================= */
const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed min-h-screen inset-0 bg-black flex items-center justify-center z-50">
    <div className="bg-gray-900 p-8 rounded-2xl text-center space-y-4">
      <h2 className="text-xl font-semibold text-white">
        Confirm Registration?
      </h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

export default EventRegistration;
