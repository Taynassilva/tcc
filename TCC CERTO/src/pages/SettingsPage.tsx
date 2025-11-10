import React, { useState } from 'react';
import { Bell, Moon, Smartphone, Globe, Lock, Eye } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [notifyTasks, setNotifyTasks] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState('system');
  const [offlineMode, setOfflineMode] = useState(true);
  const [language, setLanguage] = useState('english');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [dateFormat, setDateFormat] = useState('mdy');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Notifications</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Task Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about task assignments and updates</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="notify-tasks" 
                className="sr-only" 
                checked={notifyTasks}
                onChange={() => setNotifyTasks(!notifyTasks)}
              />
              <label 
                htmlFor="notify-tasks"
                className={`block h-6 rounded-full cursor-pointer transition-colors ${
                  notifyTasks ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    notifyTasks ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Messages</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new messages</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="notify-messages" 
                className="sr-only" 
                checked={notifyMessages}
                onChange={() => setNotifyMessages(!notifyMessages)}
              />
              <label 
                htmlFor="notify-messages"
                className={`block h-6 rounded-full cursor-pointer transition-colors ${
                  notifyMessages ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    notifyMessages ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Reminders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about upcoming deadlines</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="notify-reminders" 
                className="sr-only" 
                checked={notifyReminders}
                onChange={() => setNotifyReminders(!notifyReminders)}
              />
              <label 
                htmlFor="notify-reminders"
                className={`block h-6 rounded-full cursor-pointer transition-colors ${
                  notifyReminders ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    notifyReminders ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Appearance</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Dark Mode</h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setDarkMode('light')}
                className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                  darkMode === 'light' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="w-8 h-8 bg-white rounded-full border border-gray-300 mb-2"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">Light</span>
              </button>
              
              <button 
                onClick={() => setDarkMode('dark')}
                className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                  darkMode === 'dark' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="w-8 h-8 bg-gray-800 rounded-full border border-gray-600 mb-2"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">Dark</span>
              </button>
              
              <button 
                onClick={() => setDarkMode('system')}
                className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                  darkMode === 'system' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-800 rounded-full border border-gray-300 mb-2"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">System</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Smartphone className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Offline Mode</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Enable Offline Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Access your data when you're offline</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="offline-mode" 
                className="sr-only" 
                checked={offlineMode}
                onChange={() => setOfflineMode(!offlineMode)}
              />
              <label 
                htmlFor="offline-mode"
                className={`block h-6 rounded-full cursor-pointer transition-colors ${
                  offlineMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    offlineMode ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Language & Format</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="language" className="block font-medium text-gray-800 dark:text-white mb-2">
              Language
            </label>
            <select
              id="language"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="portuguese">Portuguese</option>
            </select>
          </div>
          
          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-2">
              Time Format
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="12h"
                  name="timeFormat"
                  value="12h"
                  checked={timeFormat === '12h'}
                  onChange={() => setTimeFormat('12h')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="12h" className="ml-2 text-gray-700 dark:text-gray-300">
                  12-hour (3:00 PM)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="24h"
                  name="timeFormat"
                  value="24h"
                  checked={timeFormat === '24h'}
                  onChange={() => setTimeFormat('24h')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="24h" className="ml-2 text-gray-700 dark:text-gray-300">
                  24-hour (15:00)
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-2">
              Date Format
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mdy"
                  name="dateFormat"
                  value="mdy"
                  checked={dateFormat === 'mdy'}
                  onChange={() => setDateFormat('mdy')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="mdy" className="ml-2 text-gray-700 dark:text-gray-300">
                  MM/DD/YYYY (03/15/2025)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dmy"
                  name="dateFormat"
                  value="dmy"
                  checked={dateFormat === 'dmy'}
                  onChange={() => setDateFormat('dmy')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="dmy" className="ml-2 text-gray-700 dark:text-gray-300">
                  DD/MM/YYYY (15/03/2025)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ymd"
                  name="dateFormat"
                  value="ymd"
                  checked={dateFormat === 'ymd'}
                  onChange={() => setDateFormat('ymd')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="ymd" className="ml-2 text-gray-700 dark:text-gray-300">
                  YYYY-MM-DD (2025-03-15)
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Lock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Security</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="two-factor" 
                className="sr-only" 
                checked={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              />
              <label 
                htmlFor="two-factor"
                className={`block h-6 rounded-full cursor-pointer transition-colors ${
                  twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <button className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            <Eye className="h-4 w-4 mr-2" />
            Change Password
          </button>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;