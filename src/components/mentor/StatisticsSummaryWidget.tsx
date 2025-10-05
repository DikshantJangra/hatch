import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string; // Placeholder for icon component name
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg"> {/* Added a subtle background for each card */}
    {/* Placeholder for icon */}
    <div className="text-[#3B82F6] text-2xl mb-2">{icon}</div>
    <p className="text-2xl font-bold text-[#111827] font-inter">{value}</p>
    <p className="text-[#6B7280] text-sm font-inter">{title}</p>
    {trend && <p className="text-xs text-gray-500 mt-1">{trend}</p>}
  </div>
);

interface StatisticsSummaryWidgetProps {
  pendingRequests: number;
  sessionsThisWeek: number;
  avgRating: number;
  totalMentees: number;
}

const StatisticsSummaryWidget: React.FC<StatisticsSummaryWidgetProps> = ({
  pendingRequests,
  sessionsThisWeek,
  avgRating,
  totalMentees,
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-[#111827] font-inter">Statistics Summary</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard title="Pending Requests" value={pendingRequests.toString()} icon="📦" />
        <StatCard title="Sessions This Week" value={sessionsThisWeek.toString()} icon="📈" trend="+15%" />
        <StatCard title="Avg. Rating" value={`${avgRating} ★`} icon="⭐" />
        <StatCard title="Total Mentees" value={totalMentees.toString()} icon="👥" />
      </div>
    </div>
  );
};

export default StatisticsSummaryWidget;