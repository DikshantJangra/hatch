import React from 'react';

interface ActiveSession {
  id: string;
  studentName: string;
  lastMessageSnippet: string;
  avatarUrl: string;
  hasUnreadMessages: boolean;
}

interface ActiveSessionsWidgetProps {
  sessions: ActiveSession[];
  onContinueChat: (id: string) => void;
}

const ActiveSessionsWidget: React.FC<ActiveSessionsWidgetProps> = ({
  sessions,
  onContinueChat,
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-[#111827] font-inter">Ongoing Conversations</h3>
      <div className="mt-4 space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center text-[#6B7280] py-8">
            {/* Placeholder for icon */}
            <div className="text-5xl mb-4">💬</div>
            <p className="font-inter">No active sessions right now.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <img src={session.avatarUrl} alt={session.studentName} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-[#111827] font-inter">{session.studentName}</p>
                  <p className="text-sm text-[#6B7280] font-inter">{session.lastMessageSnippet}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {session.hasUnreadMessages && (
                  <span className="w-3 h-3 bg-red-500 rounded-full block"></span>
                )}
                <button
                  onClick={() => onContinueChat(session.id)}
                  className="px-4 py-2 bg-[#3B82F6] text-white rounded-md font-semibold font-inter hover:bg-blue-600"
                >
                  Continue Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveSessionsWidget;