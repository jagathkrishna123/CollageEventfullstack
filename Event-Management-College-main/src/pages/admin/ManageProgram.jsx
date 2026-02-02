import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const ManageProgram = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events"); // 'programs' or 'events'

  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Load data from localStorage
    const loadedPrograms = JSON.parse(localStorage.getItem("all_programs") || "[]");
    const loadedEvents = JSON.parse(localStorage.getItem("all_events") || "[]");

    // Ensure data integrity (e.g. valid IDs)
    setPrograms(loadedPrograms);
    setEvents(loadedEvents);
  }, []);

  // 🔹 Delete Item
  const handleDelete = (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    if (type === "program") {
      const updated = programs.filter(p => p.id !== id);
      setPrograms(updated);
      localStorage.setItem("all_programs", JSON.stringify(updated));
    } else {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      localStorage.setItem("all_events", JSON.stringify(updated));
    }
  };

  // 🔹 Edit Item
  const handleEdit = (item, type) => {
    if (type === "program") {
      navigate('/admin/admin-add-program', { state: { programData: item } });
    } else {
      // For Admin Add Event
      navigate(`/admin/addevent/${item.id}`, { state: { eventData: item } });
    }
  };

  // 🔹 Toggle Status (Mock approval for now)
  const handleToggleStatus = (id, currentStatus) => {
    // This logic updates local state and storage for events
    // Assuming 'status' field exists or we create it
    const newStatus = currentStatus === "approved" ? "rejected" : "approved";

    const updatedEvents = events.map(e =>
      e.id === id ? { ...e, status: newStatus } : e
    );
    setEvents(updatedEvents);
    localStorage.setItem("all_events", JSON.stringify(updatedEvents));
  };


  // 🔹 Pagination Logic
  const data = activeTab === "programs" ? programs : events;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen text-slate-400 p-6 font-out">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Manage Content</h1>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => { setActiveTab("programs"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-md ${activeTab === 'programs' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700'}`}
            >
              Programs
            </button>
            <button
              onClick={() => { setActiveTab("events"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-md ${activeTab === 'events' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700'}`}
            >
              Events
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 rounded-xl">
            <thead className="bg-white/5">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Date</th>
                {activeTab === 'events' && <th className="p-3">Program</th>}
                {activeTab === 'events' && <th className="p-3">Status</th>}
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="p-3">
                      <div className="font-medium text-white">{item.Name || item.eventName}</div>
                      <div className="text-xs">{item.category}</div>
                    </td>
                    <td className="p-3 text-center">{item.programDate || item.date}</td>

                    {activeTab === 'events' && (
                      <td className="p-3 text-center text-sm">{item.programName || "-"}</td>
                    )}

                    {activeTab === 'events' && (
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${item.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {item.status || "Pending"}
                        </span>
                      </td>
                    )}

                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(item, activeTab === "programs" ? "program" : "event")}
                        className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      {activeTab === 'events' && (
                        <button
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`p-2 rounded hover:text-white transition-colors ${item.status === 'approved' ? 'bg-red-500/20 text-red-400 hover:bg-red-500' : 'bg-green-500/20 text-green-400 hover:bg-green-500'}`}
                          title={item.status === 'approved' ? "Reject" : "Approve"}
                        >
                          {item.status === 'approved' ? <FaTimes /> : <FaCheck />}
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item.id, activeTab === "programs" ? "program" : "event")}
                        className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No {activeTab} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} items
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Previous
              </button>

              <span className="px-3 py-2 text-white bg-blue-600 rounded text-sm">
                {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProgram;
