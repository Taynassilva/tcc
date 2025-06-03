import React from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm h-16 px-6 flex items-center justify-between z-10 transition-colors">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode} 
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;