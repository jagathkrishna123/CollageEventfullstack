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
    poster: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter programs
  const filteredPrograms = PROGRAMS.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle program select
  const handleProgramSelect = (program) => {
    setEventData((prev) => ({
      ...prev,
      programName: program.name,
    }));
    setSearchTerm(program.name);
    setShowSuggestions(false);
  };

  // Handle image
  const handleImage = (e) => {
    setEventData((prev) => ({
      ...prev,
      poster: e.target.files[0],
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      await axios.post("http://localhost:3000/event/addEvent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event added successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="text-white p-6 w-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Event</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
      >
        {/* PROGRAM SEARCH */}
        <div className="mb-6 relative">
          <label className="block mb-2 text-gray-300">Program Name</label>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search program..."
            className="w-full p-3 bg-gray-800 rounded outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && filteredPrograms.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded mt-1 max-h-48 overflow-y-auto">
              {filteredPrograms.map((program) => (
                <li
                  key={program.id}
                  onClick={() => handleProgramSelect(program)}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                >
                  {program.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* EVENT NAME */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Event Name</label>
          <input
            type="text"
            name="eventName"
            className="w-full p-3 bg-gray-800 rounded outline-none"
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Description</label>
          <textarea
            name="description"
            className="w-full p-3 bg-gray-800 rounded outline-none h-28"
            onChange={handleChange}
          />
        </div>

        {/* DATE & TIME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-300">Event Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Start Time</label>
            <input
              type="time"
              name="startTime"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">End Time</label>
            <input
              type="time"
              name="endTime"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* VENUE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Venue</label>
          <input
            type="text"
            name="venue"
            className="w-full p-3 bg-gray-800 rounded outline-none"
            onChange={handleChange}
          />
        </div>

        {/* LATITUDE & LONGITUDE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Venue Location</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              step="any"
              name="latitude"
              placeholder="Latitude"
              value={eventData.latitude}
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />

            <input
              type="number"
              step="any"
              name="longitude"
              placeholder="Longitude"
              value={eventData.longitude}
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* DEPARTMENT, INCHARGE, LIMIT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-300">Department</label>
            <input
              type="text"
              name="department"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Incharge</label>
            <input
              type="text"
              name="incharge"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Participation Limit
            </label>
            <input
              type="number"
              name="limit"
              className="w-full p-3 bg-gray-800 rounded outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* POSTER */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Event Poster</label>
          <input
            type="file"
            accept="image/*"
            className="text-gray-300"
            onChange={handleImage}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
