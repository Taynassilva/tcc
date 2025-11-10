import React from 'react';
import { MessageSquare, CheckSquare, FileText, Users } from 'lucide-react';

const ACTIVITIES = [
  {
    id: 1,
    description: 'Mark Johnson completed "Update client database"',
    time: '10 minutes ago',
    type: 'task',
  },
  {
    id: 2,
    description: 'Sara Lee commented on "Q1 Marketing Strategy"',
    time: '25 minutes ago',
    type: 'comment',
  },
  {
    id: 3,
    description: 'New document "Project Roadmap" added by James Wilson',
    time: '1 hour ago',
    type: 'document',
  },
  {
    id: 4,
    description: 'Team meeting scheduled for tomorrow at 10:00 AM',
    time: '3 hours ago',
    type: 'meeting',
  },
];

const RecentActivity: React.FC = () => {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'task': return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'comment': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'document': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'meeting': return <Users className="h-5 w-5 text-amber-500" />;
      default: return <CheckSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {ACTIVITIES.map(activity => (
          <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
            <div className="mt-1">{getActivityIcon(activity.type)}</div>
            <div>
              <p className="text-gray-800 dark:text-white">{activity.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;