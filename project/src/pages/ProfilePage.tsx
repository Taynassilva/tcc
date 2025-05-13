import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Briefcase } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="px-6 py-5 relative">
          <div className="absolute -top-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-blue-500 flex items-center justify-center text-white">
              <User className="h-12 w-12" />
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-400">Senior Project Manager</p>
            
            <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>john.doe@mindmap.com</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>(555) 123-4567</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Joined January 2022</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>San Francisco, CA</span>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Product Development</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Bio</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experienced project manager with a passion for creating efficient workflows and 
                delivering projects on time. Specializing in cross-functional team coordination
                and stakeholder management.
              </p>
            </div>
            
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;