import React from 'react';
import { FiInbox, FiBarChart2, FiStar, FiUsers } from 'react-icons/fi'; // Using Fi icons as per spec

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType; // Use React.ElementType for icon components
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
  <div className="text-center p-4">
    <div className="text-[#3B82F6] mb-2 flex justify-center">
      <Icon size={20} />
    </div>
    <p className="text-lg font-bold text-[#111827] font-sans">{value}</p>
    <p className="text-[#6B7280] text-sm font-sans">{title}</p>
    {trend && <p className="text-xs text-gray-500 mt-1 font-sans">{trend}</p>}
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
      <h3 className="text-lg font-bold text-[#111827] font-sans">Statistics Summary</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard title="Pending Requests" value={pendingRequests.toString()} icon={FiInbox} />
        <StatCard title="Sessions This Week" value={sessionsThisWeek.toString()} icon={FiBarChart2} trend="+15%" />
        <StatCard title="Avg. Rating" value={`${avgRating} ★`} icon={FiStar} />
        <StatCard title="Total Mentees" value={totalMentees.toString()} icon={FiUsers} />
      </div>
    </div>
  );
};

export default StatisticsSummaryWidget;