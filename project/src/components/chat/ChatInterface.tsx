import React, { useState } from 'react';
import { Send, Paperclip, FlipVertical as EllipsisVertical, User, Clock } from 'lucide-react';

interface Message {
  id: number;
  sender: 'me' | 'other';
  senderName: string;
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'other',
    senderName: 'Sarah Johnson',
    content: 'Hi there! Do you have an update on the project timeline?',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    sender: 'me',
    senderName: 'You',
    content: 'Yes, I\'ll be sharing the updated timeline by EOD today. We\'re making good progress!',
    timestamp: '10:32 AM'
  },
  {
    id: 3,
    sender: 'other',
    senderName: 'Sarah Johnson',
    content: 'Great, thanks for the quick response. I\'ll look for it in my inbox.',
    timestamp: '10:35 AM'
  },
  {
    id: 4,
    sender: 'other',
    senderName: 'Sarah Johnson',
    content: 'Also, can we schedule a quick call tomorrow to discuss the client presentation?',
    timestamp: '10:36 AM'
  },
  {
    id: 5,
    sender: 'me',
    senderName: 'You',
    content: 'Sure thing! How about 11 AM? I should have all the materials ready by then.',
    timestamp: '10:40 AM'
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: Math.max(0, ...messages.map(m => m.id)) + 1,
      sender: 'me',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">Sarah Johnson</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Design Director • Online</p>
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'me' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-medium ${
                    message.sender === 'me' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.senderName}
                  </span>
                  <span className={`text-xs ml-2 ${
                    message.sender === 'me' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 mx-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          
          <button 
            onClick={handleSendMessage}
            className={`p-2 rounded-full ${
              newMessage.trim() === '' 
                ? 'text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500' 
                : 'text-white bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={newMessage.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;