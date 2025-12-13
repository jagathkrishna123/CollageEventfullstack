
import React, { useState } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

const ICON_OPTIONS = [
  { label: "Bolt", value: FaBolt },
  { label: "Check Circle", value: FaCheckCircle },
  { label: "Lightbulb", value: FaLightbulb },
  { label: "Star", value: FaStar },
];

const AddProgram = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);

  const [featureIcon, setFeatureIcon] = useState(FaBolt);
  const [featureName, setFeatureName] = useState("");

  const addFeature = () => {
    if (featureName.trim() === "") return;
    setFeatures((prev) => [...prev, { icon: featureIcon, name: featureName }]);
    setFeatureName("");
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgram = {
      id: Date.now(),
      Name: name,
      image: image,
      Title: title,
      programDate: date,
      programTime: time,
      Description: description,
      features: features,
    };
    console.log("Program Created:", newProgram);
    alert("Program created! Check console output.");
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Add New Program</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
      >
        {/* Program Name */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Program Name</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hackathon"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="India’s largest student hackathon"
            required
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Program Date</label>
            <input
              type="date"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Program Duration / Time</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="48 Hours"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Program Image</label>
          <input
            type="file"
            className="text-gray-300"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            className="w-full p-3 rounded bg-gray-800 text-white h-28 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter program description..."
            required
          ></textarea>
        </div>

        {/* Features Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Program Features
          </h2>

          <div className="flex gap-4 mb-4">
            {/* Icon Selector */}
            <select
              className="p-3 rounded bg-gray-900 text-white outline-none"
              onChange={(e) => {
                const selected = ICON_OPTIONS.find(
                  (item) => item.label === e.target.value
                );
                setFeatureIcon(selected.value);
              }}
            >
              {ICON_OPTIONS.map((item, i) => (
                <option key={i} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>

            {/* Feature Text */}
            <input
              type="text"
              className="flex-1 p-3 rounded bg-gray-900 text-white outline-none"
              placeholder="Feature name..."
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
            />

            {/* Add Button */}
            <button
              type="button"
              onClick={addFeature}
              className="bg-cyan-700 px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>

          {/* Display Added Features */}
          <div className="space-y-3">
            {features.map((f, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700"
              >
                <div className="flex items-center gap-3 text-white">
                  <f.icon className="text-blue-400" />
                  <span>{f.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 text-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-800 hover:bg-cyan-900 p-3 rounded-lg font-semibold mt-4"
        >
          Create Program
        </button>
      </form>
    </div>
  );
};

export default AddProgram;