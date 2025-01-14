import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { auth } from '../../lib/firebase';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-600" />
        </div>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}