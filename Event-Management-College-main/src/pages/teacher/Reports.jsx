import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "reports_list";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const interval = setInterval(loadReports, 1000);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
            <p className="text-gray-400">
              View all reports submitted by teachers
            </p>
          </div>
          <button
            onClick={() => navigate("/teacher/addreports")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            + Add New Report
          </button>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-800/50 rounded-xl p-12 border border-gray-700">
              <svg
                className="mx-auto h-16 w-16 text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                No Reports Available
              </h3>
              <p className="text-gray-500 mb-6">
                Reports will appear here once submitted by teachers
              </p>
              <button
                onClick={() => navigate("/teacher/addreports")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Create First Report
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {/* Image */}
                {report.image && (
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={report.image}
                      alt={report.programName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Program Name */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
                    {report.programName}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 min-h-[60px]">
                    {report.description}
                  </p>

                  {/* Date and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <p className="text-gray-500 text-xs">
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {reports.length > 0 && (
          <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-gray-400 text-sm">Total Reports</p>
                <p className="text-3xl font-bold text-white">{reports.length}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Latest Report</p>
                <p className="text-lg font-semibold text-white">
                  {reports.length > 0
                    ? new Date(reports[0].createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;

