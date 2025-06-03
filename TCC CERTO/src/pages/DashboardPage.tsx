import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import RecentActivity from '../components/dashboard/RecentActivity';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingTasks />
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;