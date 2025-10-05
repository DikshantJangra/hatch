import React from 'react';

interface Feedback {
  id: string;
  rating: number;
  comment: string;
}

interface RecentFeedbackWidgetProps {
  feedback: Feedback[];
  onViewAll: () => void;
}

const RecentFeedbackWidget: React.FC<RecentFeedbackWidgetProps> = ({
  feedback,
  onViewAll,
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#111827] font-inter">Recent Feedback</h3>
        <button
          onClick={onViewAll}
          className="text-[#3B82F6] font-semibold font-inter hover:underline"
        >
          View All
        </button>
      </div>
      <div className="space-y-4">
        {feedback.length === 0 ? (
          <div className="text-center text-[#6B7280] py-8">
            <p className="font-inter">No recent feedback.</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-[#111827] font-inter">{item.rating} ★</p>
              <p className="text-sm text-[#6B7280] italic font-inter">"{item.comment}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentFeedbackWidget;