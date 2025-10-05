import React from 'react';

interface GroupSession {
  id: string;
  title: string;
  dateTime: string; // e.g., "Oct 26, 2025 - 10:00 AM"
  attendees: number;
}

interface ScheduledGroupSessionsWidgetProps {
  sessions: GroupSession[];
  onScheduleNew: () => void;
}

const ScheduledGroupSessionsWidget: React.FC<ScheduledGroupSessionsWidgetProps> = ({
  sessions,
  onScheduleNew,
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#111827] font-inter">Upcoming Workshops</h3>
        <button
          onClick={onScheduleNew}
          className="text-[#3B82F6] font-semibold font-inter hover:underline"
        >
          + Schedule New
        </button>
      </div>
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center text-[#6B7280] py-8">
            <p className="font-inter">You have no upcoming group sessions scheduled.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-[#111827] font-inter">{session.title}</p>
              <p className="text-sm text-[#6B7280] font-inter">{session.dateTime}</p>
              <p className="text-sm text-[#6B7280] font-inter">{session.attendees} attendees</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduledGroupSessionsWidget;