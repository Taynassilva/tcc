import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flag, 
  MoreVertical,
  Plus,
  Trash2
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Review marketing plan for Q2',
    description: 'Check the analytics and review the proposed marketing plan',
    completed: false,
    dueDate: '2025-03-20',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Update team documentation',
    description: 'Update onboarding materials with new process',
    completed: true,
    dueDate: '2025-03-15',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Prepare for client meeting',
    description: 'Review agenda and gather all required materials',
    completed: false,
    dueDate: '2025-03-18',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Book quarterly team offsite',
    description: 'Find venue and coordinate schedules',
    completed: false,
    dueDate: '2025-03-25',
    priority: 'low'
  }
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleToggleComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTaskTitle,
      completed: false,
      priority: 'medium'
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };
  
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high': 
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'medium': 
        return <Flag className="h-4 w-4 text-amber-500" />;
      case 'low': 
        return <Flag className="h-4 w-4 text-green-500" />;
      default: 
        return null;
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">My Tasks</h2>
      </div>
      
      <div className="p-6">
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask();
            }}
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-2">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                task.completed 
                  ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start">
                <button 
                  onClick={() => handleToggleComplete(task.id)}
                  className="mt-1 mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    task.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center space-x-3">
                    {task.dueDate && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDate(task.dueDate)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      {getPriorityIcon(task.priority)}
                      <span className="ml-1 capitalize">{task.priority}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <button className="ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;