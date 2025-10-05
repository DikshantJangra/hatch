'use client';

import { useState } from 'react';

const mockSessions = [
  {
    id: 1,
    mentee: 'John Doe',
    date: '2025-10-26',
    time: '10:00 AM',
    status: 'Scheduled',
  },
  {
    id: 2,
    mentee: 'Jane Smith',
    date: '2025-11-15',
    time: '2:00 PM',
    status: 'Completed',
  },
];

const MentorSessionsPage = () => {
  const [sessions, setSessions] = useState(mockSessions);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">My Sessions</h1>
          <p className="text-sm text-gray-600 mt-1">Here are your upcoming and past sessions with your mentees.</p>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{session.mentee}</p>
                  <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    session.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorSessionsPage;