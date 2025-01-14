import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import useNotifications from '../../hooks/useNotifications';

export default function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useNotifications();

  return (
    <div className="relative">
      <button
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">View notifications</span>
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </button>
    </div>
  );
}