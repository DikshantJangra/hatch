"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMessageSquare, FiVideo, FiCheckCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import { useRouter } from "next/navigation";

// Mock Data
const mockOneOnOneSessions = [
  {
    id: 1,
    mentor: {
      name: "John Doe",
      avatar: "",
    },
    status: "Ongoing",
    lastMessage: "2 hours ago",
    unread: 2,
  },
  {
    id: 2,
    mentor: {
      name: "Jane Smith",
      avatar: "",
    },
    status: "Ongoing",
    lastMessage: "1 day ago",
    unread: 0,
  },
];

const mockGroupSessions = [
  {
    id: 1,
    topic: "Workshop: Debugging Node.js",
    mentor: {
      name: "Sam Wilson",
      avatar: "",
    },
    date: "Tuesday, 10/25",
    time: "2:00 PM EST",
    status: "upcoming",
    meetingLink: "https://meet.google.com/new",
  },
];

const mockHistory = [
  {
    id: 1,
    mentor: {
      name: "Emily White",
      avatar: "",
    },
    status: "Ended",
    lastMessage: "1 week ago",
    rated: false,
  },
];

// Components
const SessionCard = ({ session, isHistory = false }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center">
      {session.mentor.avatar ? (
        <img src={session.mentor.avatar} alt={session.mentor.name} className="w-12 h-12 rounded-full mr-4" />
      ) : (
        <FaUserCircle className="w-12 h-12 text-gray-400 mr-4" />
      )}
      <div>
        <p className="font-bold text-lg">{session.mentor.name}</p>
        <div className="text-sm text-gray-500 flex items-center space-x-4">
          <span>Status: <span className={isHistory ? "text-gray-500" : "text-green-500"}>{session.status}</span></span>
          <span>Last message: {session.lastMessage}</span>
          {!isHistory && session.unread > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">{session.unread} Unread</span>
          )}
        </div>
      </div>
    </div>
    <div className="flex items-center">
        {isHistory ? (
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">View Log</button>
        ) : (
            <Link href={`/chat/${session.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Continue Chat</Link>
        )}
        {isHistory && !session.rated && (
            <button className="ml-2 text-blue-500 hover:underline">Rate Session</button>
        )}
    </div>
  </div>
);

const GroupSessionCard = ({ session }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="font-bold text-xl mb-2">{session.topic}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                    {session.mentor.avatar ? (
                        <img src={session.mentor.avatar} alt={session.mentor.name} className="w-8 h-8 rounded-full mr-2" />
                    ) : (
                        <FaUserCircle className="w-8 h-8 text-gray-400 mr-2" />
                    )}
                    <span>Hosted by {session.mentor.name}</span>
                </div>
                <div className="text-sm text-gray-800">
                    <p>{session.date} at {session.time}</p>
                </div>
            </div>
            <div>
                {session.status === 'upcoming' ? (
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Join Session</a>
                ) : (
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">View Recording</button>
                )}
            </div>
        </div>
  </div>
);


const EmptyState = () => (
  <div className="text-center py-16">
    <FiMessageSquare className="mx-auto text-5xl text-gray-400 mb-4" />
    <p className="text-gray-600">You currently have no active sessions. Ready to start?</p>
    <p className="text-gray-600">Click 'Find a New Mentor' above!</p>
  </div>
);

export default function MySessionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active_1on1");

  const tabs = [
    { key: "active_1on1", name: "Active Sessions (1:1)" },
    { key: "group", name: "Group Sessions" },
    { key: "history", name: "History" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "active_1on1":
        return mockOneOnOneSessions.length > 0 ? (
          <div className="space-y-4">
            {mockOneOnOneSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : <EmptyState />;
      case "group":
        return mockGroupSessions.length > 0 ? (
            <div className="space-y-4">
                {mockGroupSessions.map((session) => (
                    <GroupSessionCard key={session.id} session={session} />
                ))}
            </div>
        ) : <EmptyState />;
      case "history":
        return mockHistory.length > 0 ? (
            <div className="space-y-4">
                {mockHistory.map((session) => (
                    <SessionCard key={session.id} session={session} isHistory={true} />
                ))}
            </div>
        ) : <EmptyState />;
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
          <button onClick={() => router.push('/contributor/find-mentor')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Find a New Mentor
          </button>
        </header>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}