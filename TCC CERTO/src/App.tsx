import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || 
           (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  // For demo purposes, simulate login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;