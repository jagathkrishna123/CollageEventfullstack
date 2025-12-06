import React, { useState } from "react";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    incharge: "",
    department: "",
    limit: "",
    poster: null,
  });

  // For handling text / number / date / time fields
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // For uploading image
  const handleImage = (e) => {
    setEventData({
      ...eventData,
      poster: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", eventData);
    alert("Event Added Successfully!");
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-white">Add New Event</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
      >
        {/* EVENT NAME */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            placeholder="Enter event name"
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            className="w-full p-3 rounded bg-gray-800 text-white h-28 outline-none"
            placeholder="Event details..."
            onChange={handleChange}
          ></textarea>
        </div>

        {/* DATE + START + END TIME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* VENUE */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Venue</label>
          <input
            type="text"
            name="venue"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            placeholder="Enter venue"
            onChange={handleChange}
          />
        </div>

        {/* INCHARGE + DEPARTMENT + LIMIT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Incharge */}
          <div>
            <label className="block text-gray-300 mb-2">Incharge</label>
            <input
              type="text"
              name="incharge"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              placeholder="Teacher / Student"
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-300 mb-2">Department Conducting</label>
            <input
              type="text"
              name="department"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              placeholder="Eg: Computer Science"
              onChange={handleChange}
            />
          </div>

          {/* Student Limit */}
          <div>
            <label className="block text-gray-300 mb-2">Participation Limit</label>
            <input
              type="number"
              name="limit"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              placeholder="Eg: 100"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* POSTER UPLOAD */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Event Poster</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-gray-300"
            onChange={handleImage}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold mt-4"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
