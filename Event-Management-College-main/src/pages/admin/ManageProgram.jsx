
import React, { useState } from "react";
import { EVENTDATAS } from "../../Constants/ProgramData";
import { useNavigate } from "react-router-dom";


const ManageProgram = () => {
  const [events, setEvents] = useState(EVENTDATAS);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  

  // 🔹 Approve Event
  const handleApprove = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, status: "approved" } : event
      )
    );
  };

  // 🔹 Reject Event
  const handleReject = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, status: "rejected" } : event
      )
    );
  };

  // 🔹 Save Edited Event
  const handleSaveEdit = () => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === editingEvent.id ? editingEvent : event
      )
    );
    setEditingEvent(null);
  };

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen  text-slate-400 p-6 font-out">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Manage Events</h1>

        {/* EVENTS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 rounded-xl">
            <thead className="bg-white/5">
              <tr>
                <th className="p-3 text-left">Event</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-3">{event.eventName}</td>
                  <td className="p-3 text-center">{event.department}</td>
                  <td className="p-3 text-center">{event.date}</td>

                  {/* STATUS */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        event.status === "approved"
                          ? "bg-green-600"
                          : event.status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2 justify-center">
                   <button
  onClick={() => navigate(`/admin/addevent/${event.id}`, { state: { eventData: event } })}
  className="px-3 py-1 bg-blue-600 rounded text-white"
>
  Edit
</button>

                    <button
                      onClick={() => handleApprove(event.id)}
                      disabled={event.status === "approved"}
                      className="px-3 py-1 text-green-600 border border-green-600 font-medium rounded text-sm disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(event.id)}
                      disabled={event.status === "rejected"}
                      className="px-3 py-1 text-red-600 border border-red-600 font-medium rounded text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-400">
              Showing {startIndex + 1} to {Math.min(endIndex, events.length)} of {events.length} events
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current page
                  return page === 1 ||
                         page === totalPages ||
                         (page >= currentPage - 1 && page <= currentPage + 1);
                })
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-slate-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#020617] p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

              <input
                type="text"
                value={editingEvent.eventName}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventName: e.target.value,
                  })
                }
                className="w-full p-2 mb-3 bg-transparent border border-white/20 rounded"
                placeholder="Event Name"
              />

              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 bg-transparent border border-white/20 rounded"
                placeholder="Description"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-indigo-600 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProgram;
