import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const TASKS = [
  {
    id: 1,
    title: 'Complete quarterly report',
    dueDate: '2025-03-15T14:00:00',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Team meeting with design department',
    dueDate: '2025-03-12T10:00:00',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Update client proposal',
    dueDate: '2025-03-14T17:00:00',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Review new marketing materials',
    dueDate: '2025-03-13T12:00:00',
    priority: 'low',
  },
];

const UpcomingTasks: React.FC = () => {
  // Format date to something more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upcoming Tasks</h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {TASKS.map(task => (
          <div key={task.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">{task.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;