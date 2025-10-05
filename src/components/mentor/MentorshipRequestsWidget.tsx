import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

interface MentorshipRequest {
  id: string;
  studentName: string;
  messageSnippet: string;
  skillTags: string[];
  avatarUrl: string;
}

interface MentorshipRequestsWidgetProps {
  requests: MentorshipRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const MentorshipRequestsWidget: React.FC<MentorshipRequestsWidgetProps> = ({
  requests,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <h3 className="text-lg font-bold text-[#111827] font-sans">New Mentorship Requests</h3>
      <div className="mt-4 space-y-4">
        {requests.length === 0 ? (
          <div className="text-center text-[#6B7280] py-8">
            <FiCheckCircle size={48} className="mx-auto mb-4 text-[#3B82F6]" />
            <p className="font-sans text-base">Your request queue is clear. Well done!</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <img src={request.avatarUrl} alt={request.studentName} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-[#111827] font-sans text-base">{request.studentName}</p>
                  <p className="text-sm text-[#6B7280] font-sans">{request.messageSnippet}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {request.skillTags.map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-[#3B82F6] px-2 py-1 rounded-full font-sans">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onAccept(request.id)}
                  className="px-4 py-2 bg-[#3B82F6] text-white rounded-md font-semibold font-sans text-sm hover:bg-blue-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => onDecline(request.id)}
                  className="px-4 py-2 border border-gray-300 text-[#6B7280] rounded-md font-semibold font-sans text-sm hover:bg-gray-100"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorshipRequestsWidget;