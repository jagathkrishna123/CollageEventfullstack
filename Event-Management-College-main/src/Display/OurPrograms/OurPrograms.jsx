import React, { useState, useCallback, useMemo } from "react";
import { Items } from "../../Constants/ProgramData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OurPrograms = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Sports",
    "Academic",
    "Workshop & Training",
    "Career & Placement",
    "Social & Community",
    "Arts & Creativity"
  ];

  // FILTER PROGRAMS BY CATEGORY
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (activeFilter === "All") {
      return Items;
    }
    return Items.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="max-w-7xl mx-auto p-2 overflow-x-hidden  min-h-screen">
      <div className="flex flex-col w-full p-2 pt-20">

        {/* SECTION TITLE */}
        <div className="w-full flex flex-col md:flex-row mt-8 px-1">
          <div className="w-full flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[24px] md:text-[36px] font-bold font-lexend text-white"
            >
              <span className="text-cyan-400">College Programs</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 mt-2 text-lg"
            >
              Discover our comprehensive range of programs and workshops
            </motion.p>
          </div>

          {/* FILTER BUTTONS */}
          <div className="w-full flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* PROGRAMS GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {filteredPrograms.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="flex flex-col rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {/* IMAGE */}
              <div className="w-full overflow-hidden rounded-t-2xl relative">
                <img
                  src={item.image}
                  alt={item.Name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                  {item.Name}
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {item.category}
                </div>
              </div>

              {/* PROGRAM DETAILS */}
              <div className="flex flex-col w-full p-6 gap-4">

                {/* TITLE */}
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">
                    {item.Title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      📅 {item.programDate}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏰ {item.programTime}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {item.Description.substring(0, 150)}...
                </p>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg text-xs text-cyan-300">
                      <span className="text-cyan-400">{React.createElement(feature.icon)}</span>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>

                {/* VIEW DETAILS BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // You can add navigation logic here if needed
                  }}
                  className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                >
                  Learn More
                </motion.button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPrograms;
