import React, { useState } from 'react';
import { EVENTDATAS, SIGNUPDATA } from '../../Constants/ProgramData';

const Registrations = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter only students from SIGNUPDATA
  const students = SIGNUPDATA.filter((user) => user.userType === 'student');

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8 font-out text-gray-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-8 pb-2 border-b border-white/10">
          {selectedEvent ? 'Event Registrations' : 'All Events'}
        </h1>

        {selectedEvent ? (
          // Detailed View: Registered Students for a specific event
          <div className="animate-fadeIn">
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              &larr; Back to Events
            </button>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.eventName}</h2>
              <div className="flex gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">📅 {selectedEvent.date}</span>
                <span className="flex items-center gap-1">📍 {selectedEvent.venue}</span>
              </div>
              <p className="text-gray-400 mb-6">{selectedEvent.description}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  Registered Students ({students.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Reg No</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Semester</th>
                      <th className="px-6 py-4">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{student.registerNumber}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-white font-medium">{student.name}</span>
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
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
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
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.poster}
                    alt={event.eventName}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold rounded mb-2 inline-block shadow-lg">
                      {event.programName}
                    </span>
                    <h2 className="text-xl font-bold text-white leading-tight shadow-sm">
                      {event.eventName}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 text-sm text-gray-400">
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

                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Limit: {event.limit}</span>
                    <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Registrations &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registrations;