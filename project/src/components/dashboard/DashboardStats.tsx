import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard 
        title="Completed Tasks" 
        value="12" 
        icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        change="+3 from yesterday"
        positive
      />
      <StatCard 
        title="Pending Tasks" 
        value="8" 
        icon={<Clock className="h-8 w-8 text-amber-500" />}
        change="Same as yesterday"
        neutral
      />
      <StatCard 
        title="Overdue Tasks" 
        value="2" 
        icon={<AlertCircle className="h-8 w-8 text-red-500" />}
        change="-1 from yesterday"
        positive
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive?: boolean;
  neutral?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive, neutral }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          <p className={`text-xs mt-2 ${
            positive ? 'text-green-500' : neutral ? 'text-gray-500' : 'text-red-500'
          }`}>
            {change}
          </p>
        </div>
        <div>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;