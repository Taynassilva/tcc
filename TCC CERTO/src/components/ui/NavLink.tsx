import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, icon, text, collapsed }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors 
          dark:text-gray-200 dark:hover:bg-gray-700 ${collapsed ? 'justify-center' : 'space-x-3'}`}
      >
        <div className="text-gray-500 dark:text-gray-400">
          {icon}
        </div>
        {!collapsed && <span>{text}</span>}
      </Link>
    </li>
  );
};