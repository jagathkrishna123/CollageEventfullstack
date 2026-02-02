import React, { useState, useEffect } from "react";

const AddEvent = () => {
  const [programs, setPrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [eventData, setEventData] = useState({
    programName: "",
    programId: "",
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

  useEffect(() => {
    // Load Programs
    const storedPrograms = JSON.parse(localStorage.getItem("all_programs") || "[]");
    setPrograms(storedPrograms);

    // Load Teachers
    const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const teacherList = registeredUsers.filter(u => u.userType === "teacher");
    setTeachers(teacherList);
  }, []);

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

    const newEvent = { ...eventData, id: Date.now() };
    const events = JSON.parse(localStorage.getItem("all_events") || "[]");
    localStorage.setItem("all_events", JSON.stringify([...events, newEvent]));

    alert("Event added successfully (Local)");

    // Clear form
    setEventData({
      programName: eventData.programName, // keep program info maybe? mostly users want reset
      programId: eventData.programId,
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
      poster: null,
      priceImage: null,
      sponsorImages: [],
      participationType: "individual",
      overallIndividualLimit: "",
      departmentIndividualLimit: "",
      membersPerTeamFromDepartment: "",
      teamsPerDepartment: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050F] via-[#0a0d1f] to-[#03050F] w-full text-white font-out p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-4">
            Add New Event
          </h1>
          <p className="text-gray-400 text-lg">Create and configure a new college event</p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-75 blur-xl"></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* PROGRAM SELECTION */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Program Name</label>
              <select
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                onChange={handleProgramSelect}
                value={eventData.programId || ""}
              >
                <option value="" disabled className="bg-gray-800">Select a Program</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id} className="bg-gray-800">
                    {prog.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* EVENT NAME */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Event Name</label>
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name..."
                value={eventData.eventName}
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                onChange={handleChange}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Event Description</label>
              <textarea
                name="description"
                placeholder="Describe the event details, objectives, and what participants can expect..."
                value={eventData.description}
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                rows="4"
                onChange={handleChange}
                required
              />
            </div>

            {/* DATE & TIME */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-200 font-semibold text-lg">Event Schedule</label>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Event Date</label>
                  <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={eventData.startTime}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={eventData.endTime}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* VENUE */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Venue</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                placeholder="Enter event venue/location..."
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                onChange={handleChange}
                required
              />
            </div>

            {/* VENUE LOCATION */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-200 font-semibold text-lg">Venue Coordinates</label>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={eventData.latitude}
                    placeholder="e.g., 11.2588"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={eventData.longitude}
                    placeholder="e.g., 75.7804"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* DEPARTMENT & INCHARGE */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-200 font-semibold text-lg">Event Organization</label>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={eventData.department}
                    placeholder="Organizing department..."
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Event Incharge</label>
                  <div className="bg-white/5 border border-white/20 rounded-2xl p-4 max-h-40 overflow-y-auto backdrop-blur-sm">
                    {teachers.length === 0 ? (
                      <p className="text-gray-500 text-sm">No registered teachers found.</p>
                    ) : (
                      teachers.map((teacher) => (
                        <label key={teacher.id} className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
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
                            className="w-5 h-5 text-blue-500 rounded focus:ring-blue-600 bg-gray-700 border-gray-600"
                          />
                          <span className="text-gray-200">{teacher.name} <span className="text-gray-500 text-sm">({teacher.department})</span></span>
                        </label>
                      ))
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 ml-1">Selected: {eventData.incharge || "None"}</p>
                </div>
              </div>
            </div>

            {/* PARTICIPATION TYPE */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-200 font-semibold text-lg">Participation Type</label>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="participationType"
                    value="individual"
                    checked={eventData.participationType === "individual"}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/5 border-white/20 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200 font-medium">Individual Participation</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="participationType"
                    value="team"
                    checked={eventData.participationType === "team"}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/5 border-white/20 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200 font-medium">Team Participation</span>
                </label>
              </div>
            </div>

            {/* INDIVIDUAL PARTICIPATION SETTINGS */}
            {eventData.participationType === "individual" && (
              <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">Individual Participation Settings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">Overall Participant Limit</label>
                    <input
                      type="number"
                      name="overallIndividualLimit"
                      value={eventData.overallIndividualLimit}
                      placeholder="Total participants allowed"
                      min="1"
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">Participants Per Department</label>
                    <input
                      type="number"
                      name="departmentIndividualLimit"
                      value={eventData.departmentIndividualLimit}
                      placeholder="Max per department"
                      min="1"
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TEAM PARTICIPATION SETTINGS */}
            {eventData.participationType === "team" && (
              <div className="mb-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Team Participation Settings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">Teams Per Department</label>
                    <input
                      type="number"
                      name="teamsPerDepartment"
                      value={eventData.teamsPerDepartment}
                      placeholder="Number of teams per dept"
                      min="1"
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">Members Per Team</label>
                    <input
                      type="number"
                      name="membersPerTeamFromDepartment"
                      value={eventData.membersPerTeamFromDepartment}
                      placeholder="Team size"
                      min="1"
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EVENT MEDIA */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-200 font-semibold text-lg">Event Media</label>
              <div className="grid md:grid-cols-2 gap-6">
                {/* EVENT POSTER */}
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Event Poster</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePosterImage}
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-300"
                    />
                  </div>
                  {eventData.poster && (
                    <div className="mt-3 relative group">
                      <img
                        src={eventData.poster}
                        alt="Event poster preview"
                        className="w-32 h-32 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>

                {/* PRICE IMAGE */}
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Prize Information</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePriceImage}
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-green-500 file:text-white hover:file:bg-green-600 transition-all duration-300"
                    />
                  </div>
                  {eventData.priceImage && (
                    <div className="mt-3 relative group">
                      <img
                        src={eventData.priceImage}
                        alt="Prize information preview"
                        className="w-32 h-32 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SPONSORS */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Event Sponsors</label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSponsorImages}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition-all duration-300"
                  />
                  <p className="text-sm text-gray-400 mt-1">Select up to 3 sponsor logos (PNG, JPG)</p>
                </div>

                {/* Sponsor Preview */}
                {eventData.sponsorImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {eventData.sponsorImages.map((img, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={img}
                          alt={`Sponsor ${i + 1}`}
                          className="w-24 h-24 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeSponsorImage(i)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300"
              >
                Create Event
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
