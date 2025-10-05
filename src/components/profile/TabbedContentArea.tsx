"use client";
import { useState } from 'react';
import { FiStar, FiCheckCircle, FiLock } from 'react-icons/fi';

const tabs = ['Progress', 'Session History', 'Achievements'];

const timelineEvents = [
  { event: "Started session with Mentor Jane D.", date: "October 4, 2025" },
  { event: "Received 5-star feedback on your code snippet.", date: "October 4, 2025" },
  { event: "Your PR in 'Project-X' was merged!", source: "GitHub Integration", date: "October 3, 2025" },
  { event: "Joined Hatch!", date: "September 28, 2025" },
];

const sessions = [
  {
    mentor: { name: 'Jane D.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    date: 'October 4, 2025',
    topic: 'React Hooks',
    rating: 5,
  },
];

const achievements = [
  { name: "First Contact", description: "Started your first session.", status: "Earned" },
  { name: "Quick Learner", description: "Completed 3 sessions in a week.", status: "Earned" },
  { name: "First Contribution", description: "Merged your first PR.", status: "Locked" },
  { name: "Community Helper", description: "Answered a question in the community forum.", status: "Locked" },
];

export default function TabbedContentArea() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Progress':
        return <ProgressTimeline />;
      case 'Session History':
        return <SessionHistory />;
      case 'Achievements':
        return <AchievementsGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}

const ProgressTimeline = () => (
  <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">My Recent Activity</h3>
    <div className="flow-root">
      <ul className="-mb-8">
        {timelineEvents.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative pb-8">
              {itemIdx !== timelineEvents.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                    {/* Icon can be dynamic based on event type */}
                    <FiCheckCircle className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">{item.event}</p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time>{item.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SessionHistory = () => (
  <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">My Past Mentorship Sessions</h3>
    {sessions.length > 0 ? (
      <ul className="space-y-4">
        {sessions.map((session, idx) => (
          <li key={idx} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img src={session.mentor.avatar} alt={session.mentor.name} className="h-12 w-12 rounded-full" />
              <div className="ml-4">
                <p className="font-semibold">{session.mentor.name}</p>
                <p className="text-sm text-gray-600">{session.date} - {session.topic}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => <FiStar key={i} fill={i < session.rating ? 'currentColor' : 'none'} />)}
              </div>
              <button className="text-sm text-blue-600 hover:underline">View Chat Log</button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-500 py-8">You haven't had any sessions yet. Go find a mentor to get started!</p>
    )}
  </div>
);

const AchievementsGrid = () => (
  <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">My Achievements</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((badge, idx) => (
        <div key={idx} className={`p-4 rounded-lg text-center border ${badge.status === 'Earned' ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
          <div className={`mx-auto mb-2 w-16 h-16 rounded-full flex items-center justify-center ${badge.status === 'Earned' ? 'bg-green-500' : 'bg-gray-400'}`}>
            {badge.status === 'Earned' ? <FiCheckCircle size={32} className="text-white" /> : <FiLock size={32} className="text-white" />}
          </div>
          <p className="font-semibold">{badge.name}</p>
          <p className="text-sm text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  </div>
);