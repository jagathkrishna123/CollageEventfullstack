
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

const CATEGORY_OPTIONS = [
  "Technical",
  "Cultural",
  "Sports",
  "Academic",
  "Workshop & Training",
  "Career & Placement",
  "Social & Community",
  "Arts & Creativity"
];

const TeacherAddProgram = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);

  const [featureIcon, setFeatureIcon] = useState(FaBolt);
  const [featureIconLabel, setFeatureIconLabel] = useState("Bolt");
  const [featureName, setFeatureName] = useState("");

  const addFeature = () => {
    if (featureName.trim() === "") return;
    if (features.length >= 4) {
      alert("Maximum 4 features allowed");
      return;
    }
    setFeatures((prev) => [...prev, { iconLabel: featureIconLabel, name: featureName }]);
    setFeatureName("");
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Helper to convert file to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = null;
    if (image) {
      try {
        imageBase64 = await toBase64(image);
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Error processing image");
        return;
      }
    }

    const newProgram = {
      id: Date.now(),
      Name: name,
      category: category,
      image: imageBase64,
      brochure: brochure,
      Title: title,
      programDate: date,
      programTime: time,
      Description: description,
      features: features, // Now contains { iconLabel, name }
    };

    // Save to localStorage
    const existingPrograms = JSON.parse(localStorage.getItem("all_programs") || "[]");
    localStorage.setItem("all_programs", JSON.stringify([...existingPrograms, newProgram]));

    console.log("Program Created:", newProgram);
    alert("Program created successfully and saved!");

    // Reset form
    setName("");
    setTitle("");
    setCategory("");
    setImage(null);
    setBrochure(null);
    setDate("");
    setTime("");
    setDescription("");
    setFeatures([]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#03050F] via-[#0a0d1f] to-[#03050F] text-white font-out p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-4">
            Add New Program
          </h1>
          <p className="text-gray-400 text-lg">Create and configure a new college program</p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-75 blur-xl"></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* Program Name */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Program Name</label>
              <input
                type="text"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Hackathon"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Category</label>
              <select
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" className="bg-gray-800">Select a category</option>
                {CATEGORY_OPTIONS.map((cat, index) => (
                  <option key={index} value={cat} className="bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Program Tagline/Title</label>
              <input
                type="text"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., India’s largest student hackathon"
                required
              />
            </div>

            {/* Date + Time */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-4">Program Schedule</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Program Date</label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Program Duration / Time</label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g., 48 Hours"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Brochure Upload */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Program Brochure (PDF)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-300 cursor-pointer"
                  onChange={(e) => setBrochure(e.target.files[0])}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Program Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-300"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              {image && (
                <div className="mt-3 relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Program preview"
                    className="w-32 h-32 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-gray-200 font-semibold text-lg mb-3">Program Description</label>
              <textarea
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 text-white h-32 outline-none resize-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter program description..."
                required
              ></textarea>
            </div>

            {/* Features Section */}
            <div className="mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Program Features
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Icon Selector */}
                <select
                  className="w-full sm:w-auto p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  onChange={(e) => {
                    const selected = ICON_OPTIONS.find(
                      (item) => item.label === e.target.value
                    );
                    setFeatureIcon(selected.value);
                    setFeatureIconLabel(selected.label);
                  }}
                >
                  {ICON_OPTIONS.map((item, i) => (
                    <option key={i} value={item.label} className="bg-gray-800">
                      {item.label}
                    </option>
                  ))}
                </select>

                {/* Feature Text */}
                <input
                  type="text"
                  className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/20 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Feature name..."
                  value={featureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                />

                {/* Add Button */}
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Add Feature
                </button>
              </div>

              {/* Display Added Features */}
              {features.length > 0 && (
                <div className="space-y-3 mt-6">
                  {features.map((f, index) => {
                    const IconComp = ICON_OPTIONS.find(opt => opt.label === f.iconLabel)?.value || FaBolt;
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 shadow-md"
                      >
                        <div className="flex items-center gap-3 text-white">
                          <IconComp className="text-blue-400 text-xl" />
                          <span>{f.name}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-400 transition-colors duration-200 text-xl"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300"
              >
                Create Program
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddProgram;