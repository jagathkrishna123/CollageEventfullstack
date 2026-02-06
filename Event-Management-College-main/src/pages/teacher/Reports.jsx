import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const STORAGE_KEY = "reports_list";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAppContext();

  // Load reports from localStorage
  useEffect(() => {
    const loadReports = () => {
      try {
        const storedReports = localStorage.getItem(STORAGE_KEY);
        if (storedReports) {
          const parsedReports = JSON.parse(storedReports);
          // Sort by date (newest first)
          const sortedReports = parsedReports.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setReports(sortedReports);
        }
      } catch (error) {
        console.error("Error loading reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
    // Refresh reports when storage changes
    window.addEventListener("storage", loadReports);
    // Also check periodically for changes
    const interval = setInterval(loadReports, 2000);

    return () => {
      window.removeEventListener("storage", loadReports);
      clearInterval(interval);
    };
  }, []);

  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    }
  };

  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#03050F] flex items-center justify-center">
        <div className="text-blue-500 font-bold animate-pulse text-xl">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#03050F] p-6 overflow-y-auto font-out">
      <div className="max-w-7xl mx-auto pt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12 pt-20 md:pt-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              Event Reports
            </h1>
            <p className="text-gray-500 font-medium">
              View comprehensive reports and outcomes from past events
            </p>
          </div>
          {isTeacher && (
            <button
              onClick={() => navigate("/teacher/addreports")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              <FaPlus /> Add Report
            </button>
          )}
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-white/5 border-dashed">
            <div className="max-w-md mx-auto">
              <span className="text-6xl mb-6 block grayscale opacity-30">📊</span>
              <h3 className="text-2xl font-black text-white mb-2">
                No Reports Published
              </h3>
              <p className="text-gray-500 mb-8 font-medium">
                Detailed event reports will appear here once submitted by the faculty.
              </p>
              {isTeacher && (
                <button
                  onClick={() => navigate("/teacher/addreports")}
                  className="px-8 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-xl font-bold transition-all border border-white/10 uppercase text-xs tracking-widest"
                >
                  Create First Report
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  {report.image ? (
                    <img
                      src={report.image}
                      alt={report.programName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03050F] via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-8 -mt-6 relative">
                  <div className="bg-[#03050F] absolute inset-x-0 top-0 h-6 -z-10 rounded-t-[2.5rem]" />

                  {/* Program Name */}
                  <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                    {report.programName}
                  </h3>

                  {/* Description */}
                  <div className="mb-6 relative">
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 font-medium">
                      {report.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    {isTeacher && (
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Report"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;