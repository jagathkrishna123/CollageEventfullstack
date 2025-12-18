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
    priceImages: [],
    sponsorImages: [],
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

  // Handle single image fields (poster)
  const handleSingleImageChange = (e) => {
    const { name, files } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Handle multiple image fields (price & sponsor)
  const handleMultipleImagesChange = (e) => {
    const { name, files } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: [...prev[name], ...Array.from(files)],
    }));
  };

  // Remove image from multiple images
  const handleRemoveImage = (field, index) => {
    setEventData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });

      await axios.post("http://localhost:3000/event/addEvent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event added successfully!");
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
            <label className="block mb-2 text-gray-300">Participation Limit</label>
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
            name="poster"
            className="text-gray-700 bg-slate-300 p-2 rounded-md cursor-pointer"
            onChange={handleSingleImageChange}
          />
        </div>

        {/* PRICE IMAGES */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Price Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            name="priceImages"
            className="text-gray-700 bg-slate-300 p-2 rounded-md cursor-pointer"
            onChange={handleMultipleImagesChange}
          />
          {eventData.priceImages.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {eventData.priceImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Price"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("priceImages", idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SPONSOR IMAGES */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Sponsor Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            name="sponsorImages"
            className="text-gray-700 bg-slate-300 p-2 rounded-md cursor-pointer"
            onChange={handleMultipleImagesChange}
          />
          {eventData.sponsorImages.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {eventData.sponsorImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Sponsor"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("sponsorImages", idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
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
