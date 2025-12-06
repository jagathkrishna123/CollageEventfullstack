import React, { useState } from "react";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    poster: null,
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

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
    <div className="text-white p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Event</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div>
            <label className="block mb-1 text-gray-300">Event Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              placeholder="Enter event name"
              onChange={handleChange}
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block mb-1 text-gray-300">Venue</label>
            <input
              type="text"
              name="venue"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              placeholder="Enter venue"
              onChange={handleChange}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Time */}
          <div>
            <label className="block mb-1 text-gray-300">Time</label>
            <input
              type="time"
              name="time"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Description (Full width) */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              className="w-full p-3 rounded bg-gray-800 text-white h-32 outline-none"
              placeholder="Event details..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Poster Upload (Full width) */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-300">Event Poster</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-300"
              onChange={handleImage}
            />
          </div>

          {/* Submit Button (Full width) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
