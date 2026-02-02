import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = Boolean(id);

  const [programs, setPrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [eventData, setEventData] = useState({
    programName: "",
    programId: "", // Store ID for linking
    eventName: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    latitude: "",
    longitude: "",
    incharge: "",
    department: "",
    limit: "",

    // Images
    poster: null,
    priceImage: null,
    sponsorImages: [],

    // Participation
    participationType: "individual",
    overallIndividualLimit: "",
    departmentIndividualLimit: "",
    membersPerTeamFromDepartment: "",
    teamsPerDepartment: "",
  });

  // Load Programs and Event Data (if editing)
  useEffect(() => {
    // 1. Load Programs
    const storedPrograms = JSON.parse(localStorage.getItem("all_programs") || "[]");
    setPrograms(storedPrograms);

    // 2. Load Teachers
    const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const teacherList = registeredUsers.filter(u => u.userType === "teacher");
    setTeachers(teacherList);

    // 2. Load Event for Editing
    if (isEditMode) {
      const allEvents = JSON.parse(localStorage.getItem("all_events") || "[]");
      const eventToEdit = allEvents.find(e => e.id === Number(id));

      if (eventToEdit) {
        setEventData(eventToEdit);
      } else {
        // Fallback: check navigation state or basic error handle
        console.warn("Event not found in local storage for editing");
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramSelect = (e) => {
    const selectedId = Number(e.target.value);
    const selectedProgram = programs.find(p => p.id === selectedId);
    if (selectedProgram) {
      setEventData(prev => ({
        ...prev,
        programName: selectedProgram.Name,
        programId: selectedProgram.id
      }));
    }
  };

  // Helper for Base64
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handlePosterImage = async (e) => {
    if (e.target.files[0]) {
      const base64 = await toBase64(e.target.files[0]);
      setEventData((prev) => ({ ...prev, poster: base64 }));
    }
  };

  const handlePriceImage = async (e) => {
    if (e.target.files[0]) {
      const base64 = await toBase64(e.target.files[0]);
      setEventData((prev) => ({ ...prev, priceImage: base64 }));
    }
  };

  const handleSponsorImages = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(files.map(f => toBase64(f)));
    setEventData((prev) => ({
      ...prev,
      sponsorImages: [...prev.sponsorImages, ...base64Files].slice(0, 3),
    }));
  };

  const removeSponsorImage = (index) => {
    setEventData((prev) => ({
      ...prev,
      sponsorImages: prev.sponsorImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.programId) {
      alert("Please select a program");
      return;
    }

    const events = JSON.parse(localStorage.getItem("all_events") || "[]");

    if (isEditMode) {
      // Update existing
      const updatedEvents = events.map(ev => ev.id === Number(id) ? { ...eventData, id: Number(id) } : ev);
      localStorage.setItem("all_events", JSON.stringify(updatedEvents));
      alert("Event updated successfully (Local)");
    } else {
      // Add new using simple ID generation
      const newEvent = { ...eventData, id: Date.now() };
      localStorage.setItem("all_events", JSON.stringify([...events, newEvent]));
      alert("Event added successfully (Local)");
      // Clear form roughly/navigate? Keeping it simple.
    }
  };

  return (
    <div className="text-white p-6 w-full overflow-y-auto font-out">
      <h1 className="text-3xl font-bold mb-8">{isEditMode ? "Edit Event" : "Add New Event"}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
      >
        {/* PROGRAM SELECTION */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Program Name</label>
          <select
            className="w-full p-3 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleProgramSelect}
            value={eventData.programId || ""}
          >
            <option value="" disabled>Select a Program</option>
            {programs.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.Name}
              </option>
            ))}
          </select>
        </div>

        {/* EVENT NAME */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            rows="4"
            required
          />
        </div>

        {/* DATE & TIME */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-300">Event Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">End Time</label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
          </div>
        </div>

        {/* VENUE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Venue</label>
          <input
            type="text"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
        </div>

        {/* LAT & LNG */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Venue Location</label>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              step="any"
              name="latitude"
              value={eventData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="p-3 bg-gray-800 rounded w-full"
            />
            <input
              type="number"
              step="any"
              name="longitude"
              value={eventData.longitude}
              placeholder="Longitude"
              className="p-3 bg-gray-800 rounded w-full"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* DEPARTMENT & INCHARGE */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-300">Department</label>
            <input
              type="text"
              name="department"
              value={eventData.department}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Incharge</label>
            <div className="bg-gray-800 p-3 rounded w-full max-h-40 overflow-y-auto border border-gray-700">
              {teachers.length === 0 ? (
                <p className="text-gray-500 text-sm">No registered teachers found.</p>
              ) : (
                teachers.map((teacher) => (
                  <label key={teacher.id} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-700/50 p-1 rounded">
                    <input
                      type="checkbox"
                      value={teacher.name}
                      checked={eventData.incharge.split(", ").includes(teacher.name)}
                      onChange={(e) => {
                        const name = e.target.value;
                        const currentIncharges = eventData.incharge ? eventData.incharge.split(", ") : [];

                        let newIncharges;
                        if (e.target.checked) {
                          newIncharges = [...currentIncharges, name];
                        } else {
                          newIncharges = currentIncharges.filter(i => i !== name);
                        }

                        setEventData(prev => ({ ...prev, incharge: newIncharges.join(", ") }));
                      }}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="text-gray-200 text-sm">{teacher.name} ({teacher.department})</span>
                  </label>
                ))
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Selected: {eventData.incharge || "None"}</p>
          </div>
        </div>

        {/* PARTICIPATION TYPE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Participation Type</label>
          <div className="flex gap-6">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="participationType"
                value="individual"
                checked={eventData.participationType === "individual"}
                onChange={handleChange}
              />
              Individual
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="participationType"
                value="team"
                checked={eventData.participationType === "team"}
                onChange={handleChange}
              />
              Team
            </label>

          </div>
        </div>


        {/* INDIVIDUAL */}
        {eventData.participationType === "individual" && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-gray-300">Overall Participant Limit</label>
              <input
                type="number"
                name="overallIndividualLimit"
                value={eventData.overallIndividualLimit}
                onChange={handleChange}
                min="1"
                className="p-3 bg-gray-800 rounded w-full"
                placeholder="Minimum: 1"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Participants Per Department</label>
              <input
                type="number"
                name="departmentIndividualLimit"
                value={eventData.departmentIndividualLimit}
                onChange={handleChange}
                min="1"
                className="p-3 bg-gray-800 rounded w-full"
                placeholder="Minimum: 1"
              />
            </div>
          </div>
        )}

        {/* TEAM */}
        {eventData.participationType === "team" && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-gray-300">Teams Per Department</label>
              <input
                type="number"
                name="teamsPerDepartment"
                value={eventData.teamsPerDepartment}
                onChange={handleChange}
                min="1"
                className="p-3 bg-gray-800 rounded w-full"
                placeholder="Minimum: 1"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Members Per Team</label>
              <input
                type="number"
                name="membersPerTeamFromDepartment"
                value={eventData.membersPerTeamFromDepartment}
                onChange={handleChange}
                min="1"
                className="p-3 bg-gray-800 rounded w-full"
                placeholder="Minimum: 1"
              />
            </div>
          </div>
        )}

        {/* EVENT POSTER */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Event Poster</label>
          <input type="file" accept="image/*" onChange={handlePosterImage} />
          {eventData.poster && <img src={eventData.poster} className="w-24 mt-2 rounded" />}
        </div>

        {/* PRICE IMAGE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Price Image</label>
          <input type="file" accept="image/*" onChange={handlePriceImage} />
          {eventData.priceImage && <img src={eventData.priceImage} className="w-24 mt-2 rounded" />}
        </div>

        {/* SPONSORS */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Sponsor Images (Max 3)</label>
          <input type="file" accept="image/*" multiple onChange={handleSponsorImages} />

          <div className="flex gap-3 mt-3">
            {eventData.sponsorImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeSponsorImage(i)}
                  className="absolute -top-2 -right-2 bg-red-600 text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold">
          {isEditMode ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
