import React from 'react';
import { User } from '../types';
import { Shield, Ban, Eye } from 'lucide-react';

interface UserRowProps {
  user: User;
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{user.email}</div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.walletAddress}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.balance} XLC</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <Eye className="w-5 h-5" />
          </button>
          <button className="text-yellow-600 hover:text-yellow-900">
            <Shield className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <Ban className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}