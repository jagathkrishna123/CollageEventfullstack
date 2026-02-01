import React, { useState } from 'react';
import { EVENTDATAS, SIGNUPDATA } from '../../Constants/ProgramData';

const Registrations = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter only students from SIGNUPDATA
  const students = SIGNUPDATA.filter((user) => user.userType === 'student');

  return (
    <div className="p-6 text-gray-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        {selectedEvent ? 'Event Registrations' : 'All Events'}
      </h1>

      {selectedEvent ? (
        // Detailed View: Registered Students for a specific event
        <div className="animate-fadeIn">
          <button
            onClick={() => setSelectedEvent(null)}
            className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            &larr; Back to Events
          </button>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">{selectedEvent.eventName}</h2>
            <div className="flex gap-4 text-sm text-gray-400 mb-4">
              <span>📅 {selectedEvent.date}</span>
              <span>📍 {selectedEvent.venue}</span>
            </div>
            <p className="text-gray-400 mb-6">{selectedEvent.description}</p>
          </div>

          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Registered Students ({students.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Reg No</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Semester</th>
                    <th className="px-6 py-3">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{student.registerNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white">{student.name}</span>
                          <span className="text-xs text-gray-500">{student.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{student.department}</td>
                      <td className="px-6 py-4">{student.semester}</td>
                      <td className="px-6 py-4">{student.mobile}</td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No students registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // List View: All Events
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTDATAS.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-gray-700 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.poster}
                  alt={event.eventName}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded mb-2 inline-block">
                    {event.programName}
                  </span>
                  <h2 className="text-lg font-bold text-white leading-tight shadow-sm">
                    {event.eventName}
                  </h2>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.date} • {event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👨‍🏫</span>
                    <span>{event.incharge}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Limit: {event.limit}</span>
                  <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    View Registrations &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;
