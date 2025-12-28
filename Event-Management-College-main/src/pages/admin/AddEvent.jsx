import React, { useState } from "react";
import axios from "axios";
import { PROGRAMS, EVENTDATAS } from "../../Constants/ProgramData";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = Boolean(id);
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
  
  useEffect(() => {
    if (!id) return;

    // First, check if event data was passed via navigation state
    if (location.state?.eventData) {
      const event = location.state.eventData;
      setEventData({
        programName: event.programName || "",
        eventName: event.eventName || "",
        description: event.description || "",
        date: event.date || "",
        startTime: event.startTime || "",
        endTime: event.endTime || "",
        venue: event.venue || "",
        latitude: event.latitude || "",
        longitude: event.longitude || "",
        incharge: event.incharge || "",
        department: event.department || "",
        limit: event.limit || "",
        poster: null,
        priceImage: null,
        sponsorImages: [],
        participationType: event.participationType || "",
        overallIndividualLimit: event.overallIndividualLimit || "",
        departmentIndividualLimit: event.departmentIndividualLimit || "",
        membersPerTeamFromDepartment: event.membersPerTeamFromDepartment || "",
        teamsPerDepartment: event.teamsPerDepartment || "",
      });
      setSearchTerm(event.programName || "");
      return;
    }

    // Second, check local EVENTDATAS
    const localEvent = EVENTDATAS.find(e => e.id === parseInt(id));
    if (localEvent) {
      setEventData({
        programName: localEvent.programName || "",
        eventName: localEvent.eventName || "",
        description: localEvent.description || "",
        date: localEvent.date || "",
        startTime: localEvent.startTime || "",
        endTime: localEvent.endTime || "",
        venue: localEvent.venue || "",
        latitude: localEvent.latitude || "",
        longitude: localEvent.longitude || "",
        incharge: localEvent.incharge || "",
        department: localEvent.department || "",
        limit: localEvent.limit || "",
        poster: null,
        priceImage: null,
        sponsorImages: [],
        participationType: localEvent.participationType || "",
        overallIndividualLimit: localEvent.overallIndividualLimit || "",
        departmentIndividualLimit: localEvent.departmentIndividualLimit || "",
        membersPerTeamFromDepartment: localEvent.membersPerTeamFromDepartment || "",
        teamsPerDepartment: localEvent.teamsPerDepartment || "",
      });
      setSearchTerm(localEvent.programName || "");
      return;
    }

    // Third, try to fetch from API
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/event/${id}`);
        const event = res.data;

        setEventData({
          ...event,
          poster: null,
          priceImage: null,
          sponsorImages: [],
        });

        setSearchTerm(event.programName || "");
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id, location.state]);


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
/////////////////////////////////////////////////
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

    if (isEditMode) {
      await axios.put(
        `http://localhost:3000/event/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Event updated successfully");
    } else {
      await axios.post(
        "http://localhost:3000/event/addEvent",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Event added successfully");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};




  return (
    <div className="text-white p-6 w-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">{isEditMode ? "Edit Event" : "Add New Event"}</h1>

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
            className="w-full p-3 bg-gray-800 rounded"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && (
            <ul className="absolute w-full bg-gray-800 mt-1 rounded">
              {filteredPrograms.map((program) => (
                <li
                  key={program.id}
                  onClick={() => handleProgramSelect(program)}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
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
            value={eventData.eventName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
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
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Incharge</label>
            <input
              type="text"
              name="incharge"
              value={eventData.incharge}
              onChange={handleChange}
              className="p-3 bg-gray-800 rounded w-full"
            />
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
        checked={eventData.participationType === "individual"} // ✅ ADD THIS
        onChange={handleChange}
      />
      Individual
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="participationType"
        value="team"
        checked={eventData.participationType === "team"} // ✅ ADD THIS
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
                className="p-3 bg-gray-800 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Participants Per Department</label>
              <input
                type="number"
                name="departmentIndividualLimit"
                value={eventData.departmentIndividualLimit}
                onChange={handleChange}
                className="p-3 bg-gray-800 rounded w-full"
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
                className="p-3 bg-gray-800 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Members Per Team</label>
              <input
                type="number"
                name="membersPerTeamFromDepartment"
                value={eventData.membersPerTeamFromDepartment}
                onChange={handleChange}
                className="p-3 bg-gray-800 rounded w-full"
              />
            </div>
          </div>
        )}

        {/* EVENT POSTER */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Event Poster</label>
          <input type="file" accept="image/*" onChange={handlePosterImage} />
          {eventData.poster && <img src={URL.createObjectURL(eventData.poster)} className="w-24 mt-2 rounded" />}
        </div>

        {/* PRICE IMAGE */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Price Image</label>
          <input type="file" accept="image/*" onChange={handlePriceImage} />
          {eventData.priceImage && <img src={URL.createObjectURL(eventData.priceImage)} className="w-24 mt-2 rounded" />}
        </div>

        {/* SPONSORS */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Sponsor Images (Max 3)</label>
          <input type="file" accept="image/*" multiple onChange={handleSponsorImages} />

          <div className="flex gap-3 mt-3">
            {eventData.sponsorImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="w-20 h-20 object-cover rounded" />
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
