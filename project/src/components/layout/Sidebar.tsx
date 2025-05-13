import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  Search, 
  Settings, 
  User 
} from 'lucide-react';
import { NavLink } from '../ui/NavLink';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`bg-white dark:bg-gray-800 h-screen fixed top-0 left-0 shadow-md transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <BrainCircuit className="h-8 w-8 text-blue-500" />
          {!collapsed && <h1 className="text-xl font-bold text-gray-800 dark:text-white">Mind Map</h1>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white ${collapsed ? 'hidden' : ''}`}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <NavLink 
            to="/dashboard" 
            icon={<BrainCircuit />} 
            text="Dashboard" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/tasks" 
            icon={<CheckSquare />} 
            text="Tasks" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/calendar" 
            icon={<Calendar />} 
            text="Calendar" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/chat" 
            icon={<MessageSquare />} 
            text="Chat" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/search" 
            icon={<Search />} 
            text="Search" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/profile" 
            icon={<User />} 
            text="Profile" 
            collapsed={collapsed} 
          />
          <NavLink 
            to="/settings" 
            icon={<Settings />} 
            text="Settings" 
            collapsed={collapsed} 
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;