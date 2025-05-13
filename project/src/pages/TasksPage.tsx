import React from 'react';
import TaskList from '../components/tasks/TaskList';

const TasksPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tasks</h1>
      <TaskList />
    </div>
  );
};

export default TasksPage;