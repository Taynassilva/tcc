import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample events
const EVENTS = [
  { id: 1, title: 'Team Meeting', date: '2025-03-15', time: '10:00 AM', type: 'meeting' },
  { id: 2, title: 'Project Deadline', date: '2025-03-20', time: '5:00 PM', type: 'deadline' },
  { id: 3, title: 'Client Call', date: '2025-03-18', time: '2:30 PM', type: 'call' },
  { id: 4, title: 'Training Session', date: '2025-03-22', time: '9:00 AM', type: 'training' },
];

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  const getDateString = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };
  
  const getEventsForDate = (dateString: string) => {
    return EVENTS.filter(event => event.date === dateString);
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'meeting': return 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200';
      case 'deadline': return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200';
      case 'call': return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200';
      case 'training': return 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-200';
      default: return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200';
    }
  };

  // Generate calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-28 border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-900"></div>);
  }
  
  // Add cells for days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = getDateString(day);
    const todayEvents = getEventsForDate(dateString);
    const isToday = new Date().toDateString() === new Date(dateString).toDateString();
    
    calendarDays.push(
      <div 
        key={day} 
        className={`h-28 border border-gray-200 dark:border-gray-700 p-2 ${
          isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${
            isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {day}
          </span>
          {isToday && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
        </div>
        
        <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px]">
          {todayEvents.map(event => (
            <div 
              key={event.id} 
              className={`text-xs p-1 rounded border ${getEventColor(event.type)} truncate`}
            >
              <div className="font-medium">{event.title}</div>
              <div>{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button 
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Event</span>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map(day => (
          <div key={day} className="text-center font-medium text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    </div>
  );
};

export default CalendarView;