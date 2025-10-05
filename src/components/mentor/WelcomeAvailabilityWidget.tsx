import React from 'react';

interface WelcomeAvailabilityWidgetProps {
  mentorName: string;
  isAvailable: boolean;
  onToggleAvailability: () => void;
}

const WelcomeAvailabilityWidget: React.FC<WelcomeAvailabilityWidgetProps> = ({
  mentorName,
  isAvailable,
  onToggleAvailability,
}) => {
  const availabilityText = isAvailable ? 'Available' : 'Offline';
  const availabilityColor = isAvailable ? 'bg-[#10B981]' : 'bg-[#6B7280]';

  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-[#111827] font-inter">Welcome back, {mentorName}!</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[#6B7280] text-lg font-inter">Your Mentorship Status:</span>
        <button
          onClick={onToggleAvailability}
          className={`px-4 py-2 rounded-full text-white font-semibold font-inter ${availabilityColor}`}
        >
          {availabilityText}
        </button>
      </div>
    </div>
  );
};

export default WelcomeAvailabilityWidget;