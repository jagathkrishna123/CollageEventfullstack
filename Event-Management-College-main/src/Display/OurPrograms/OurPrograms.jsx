import React, { useState, useCallback, useMemo } from "react";
import { PROGRAMDATAS } from "../../Constants/ProgramData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OurPrograms = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  // FILTER EVENTS BY CATEGORY
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (activeFilter === "All") {
      return PROGRAMDATAS;
    }
    if (activeFilter === "Recommended") {
      return PROGRAMDATAS.filter((item) => item.isRecommended === true);
    }
    return PROGRAMDATAS.filter(
      (item) => item.status.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter]);

  return (
    <div className="max-w-7xl mx-auto p-2 overflow-x-hidden">
      <div className="flex flex-col w-full p-2">

        {/* SECTION TITLE */}
        <div className="w-full flex flex-col md:flex-row mt-8 px-1">
          <div className="w-full flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[24px] md:text-[36px] font-bold font-lexend text-gray-600"
            >
              <span className="text-cyan-600">College Programs</span>
            </motion.h2>
          </div>

          {/* FILTER BUTTONS */}
          <div className="w-auto px-2 py-2 rounded-md flex flex-row items-center justify-center md:justify-center gap-3 
              font-hind text-[14px] md:text-[15px] text-gray-500 cursor-pointer mt-5 bg-gray-900">

            {["All", "Recommended", "Social", "Sports", "Academics"].map(
              (filter) => (
                <motion.p
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className="relative px-2 py-1 cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}

                  {activeFilter === filter && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-gray-700"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.p>
              )
            )}
          </div>
        </div>

        {/* EVENT GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4">
          {filteredPrograms.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/event/${item.id}`)}
              key={item.id}
              className="flex flex-col items-center rounded-xl bg-gradient-to-br from-neutral-800 via-gray-800 to-gray-900 border border-gray-700 shadow hover:shadow-xl transition cursor-pointer "
            >
              {/* IMAGE */}
              <div className="w-full overflow-hidden rounded-t-xl relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />

                <p className="absolute top-2 left-2 bg-cyan-700 text-white text-sm px-3 py-1 rounded">
                  {item.status}
                </p>
              </div>

              {/* EVENT DETAILS */}
              <div className="flex flex-col w-full p-6 gap-2">

                {/* NAME */}
                <p className="font-lexend text-[20px] text-gray-300">
                  {item.name}
                </p>

                {/* DESCRIPTION */}
                <p className="flex flex-row gap-2 items-center text-gray-400 font-hind text-[15px]">
                  🏛️ {item.description}
                </p>

                {/* VENUE */}
                <p className="flex flex-row gap-2 items-center text-gray-400 font-hind text-[15px]">
                  📍 {item.venue}
                </p>

                {/* PRIZE */}
                <p className="flex flex-row gap-2 items-center text-yellow-500 font-hind text-[15px]">
                  🏆 {item.prize}
                </p>

                {/* REGISTERED */}
                <p className="flex flex-row items-center gap-2 font-hind text-[13px] text-gray-400">
                  👥 {item.registered}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPrograms;
