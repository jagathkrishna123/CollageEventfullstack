import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

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

const AddProgram = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingProgram = location.state?.programData || null;

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For showing existing image
  const [brochure, setBrochure] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);

  const [featureIcon, setFeatureIcon] = useState(FaBolt);
  const [featureIconLabel, setFeatureIconLabel] = useState("Bolt");
  const [featureName, setFeatureName] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (existingProgram) {
      setName(existingProgram.Name);
      setTitle(existingProgram.Title);
      setCategory(existingProgram.category || "");
      setDate(existingProgram.programDate);
      setTime(existingProgram.programTime);
      setDescription(existingProgram.Description);
      setFeatures(existingProgram.features || []);
      setImagePreview(existingProgram.image);
      // Note: we can't set file inputs programmatically, so 'image' and 'brochure' stay null unless user picks new ones
    }
  }, [existingProgram]);

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

    let imageBase64 = imagePreview; // Default to existing image
    if (image) {
      try {
        imageBase64 = await toBase64(image);
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Error processing image");
        return;
      }
    }

    const programData = {
      id: existingProgram ? existingProgram.id : Date.now(),
      Name: name,
      category: category,
      image: imageBase64,
      brochure: brochure, // In a real app we'd upload this too
      Title: title,
      programDate: date,
      programTime: time,
      Description: description,
      features: features,
    };

    // Save to localStorage
    const existingPrograms = JSON.parse(localStorage.getItem("all_programs") || "[]");

    let updatedPrograms;
    if (existingProgram) {
      // Update existing
      updatedPrograms = existingPrograms.map(p =>
        p.id === existingProgram.id ? programData : p
      );
      alert("Program updated successfully!");
    } else {
      // Create new
      updatedPrograms = [...existingPrograms, programData];
      alert("Program created successfully!");
    }

    localStorage.setItem("all_programs", JSON.stringify(updatedPrograms));
    console.log(existingProgram ? "Program Updated:" : "Program Created:", programData);

    // Reset or Navigate back
    if (existingProgram) {
      navigate(-1); // Go back to manage page
    } else {
      // Reset form
      setName("");
      setTitle("");
      setCategory("");
      setImage(null);
      setImagePreview(null);
      setBrochure(null);
      setDate("");
      setTime("");
      setDescription("");
      setFeatures([]);
    }
  };

  return (
    <div className="text-gray-200 p-6 font-out">
      <h1 className="text-3xl font-bold mb-8">{existingProgram ? "Edit Program" : "Add New Program"}</h1>

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

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Category</label>
          <select
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

        {/* Brochure Upload */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Program Brochure (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="text-gray-700 bg-slate-300 p-2 rounded-md cursor-pointer w-full"
            onChange={(e) => setBrochure(e.target.files[0])}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Program Image</label>
          {imagePreview && (
            <div className="mb-2">
              <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            className="text-gray-700 bg-slate-300 p-2 rounded-md cursor-pointer"
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
                setFeatureIconLabel(selected.label);
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
            {features.map((f, index) => {
              const IconComp = ICON_OPTIONS.find(opt => opt.label === f.iconLabel)?.value || FaBolt;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700"
                >
                  <div className="flex items-center gap-3 text-white">
                    <IconComp className="text-blue-400" />
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
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-800 hover:bg-cyan-900 p-3 rounded-lg font-semibold mt-4"
        >
          {existingProgram ? "Update Program" : "Create Program"}
        </button>
      </form>
    </div>
  );
};
export default AddProgram;