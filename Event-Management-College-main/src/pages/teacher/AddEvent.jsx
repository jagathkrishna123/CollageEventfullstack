import React, { useState } from "react";
import axios from "axios";
import { PROGRAMS } from "../../Constants/ProgramData";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    programName: "",
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
    participationType: "",
    overallIndividualLimit: "",
    departmentIndividualLimit: "",
    membersPerTeamFromDepartment: "",
    teamsPerDepartment: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPrograms = PROGRAMS.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramSelect = (program) => {
    setEventData((prev) => ({ ...prev, programName: program.name }));
    setSearchTerm(program.name);
    setShowSuggestions(false);
  };

  const handlePosterImage = (e) => {
    setEventData((prev) => ({ ...prev, poster: e.target.files[0] }));
  };

  const handlePriceImage = (e) => {
    setEventData((prev) => ({ ...prev, priceImage: e.target.files[0] }));
  };

  const handleSponsorImages = (e) => {
    const files = Array.from(e.target.files);
    setEventData((prev) => ({
      ...prev,
      sponsorImages: [...prev.sponsorImages, ...files].slice(0, 3),
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

    try {
      const formData = new FormData();

      Object.entries(eventData).forEach(([key, value]) => {
        if (key === "sponsorImages") {
          value.forEach((img) => formData.append("sponsorImages", img));
        } else {
          formData.append(key, value);
        }
      });

      await axios.post("http://localhost:3000/event/addEvent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event added successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050F] via-[#0a0d1f] to-[#03050F] w-full text-white font-out p-6 overflow-y-auto">
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
            {/* PROGRAM SEARCH */}
            <div className="mb-8 relative">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Program Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search and select a program..."
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                />
                {showSuggestions && (
                  <ul className="absolute w-full bg-slate-800/95 backdrop-blur-lg border border-white/10 mt-2 rounded-2xl shadow-2xl z-10 max-h-48 overflow-y-auto">
                    {filteredPrograms.map((program) => (
                      <li
                        key={program.id}
                        onClick={() => handleProgramSelect(program)}
                        className="p-4 hover:bg-blue-500/20 cursor-pointer transition-colors duration-200 border-b border-white/5 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <span className="text-white font-medium">{program.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* EVENT NAME */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Event Name</label>
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name..."
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <label className="block mb-3 text-gray-200 font-semibold text-lg">Event Description</label>
              <textarea
                name="description"
                placeholder="Describe the event details, objectives, and what participants can expect..."
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                rows="4"
                onChange={handleChange}
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
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
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
                placeholder="Enter event venue/location..."
                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                onChange={handleChange}
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
                    placeholder="Organizing department..."
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">Event Incharge</label>
                  <input
                    type="text"
                    name="incharge"
                    placeholder="Faculty coordinator..."
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    onChange={handleChange}
                  />
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
                        src={URL.createObjectURL(eventData.poster)}
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
                        src={URL.createObjectURL(eventData.priceImage)}
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
                          src={URL.createObjectURL(img)}
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
