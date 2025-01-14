import React, { useState } from 'react';
import { User, Key, Shield, Ban, RefreshCw } from 'lucide-react';
import { useQuery } from 'react-query';
import { APIUser } from '../types';
import ErrorBoundary from '../../../components/ErrorBoundary';

// Simulated API call - replace with actual API integration
const fetchAPIUsers = async (): Promise<APIUser[]> => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: '1',
      name: 'Trading Bot A',
      email: 'bot.a@example.com',
      apiKey: 'xlc_key_123456789',
      status: 'active',
      rateLimits: {
        requests: 1000,
        period: '1m'
      },
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      lastActive: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: '2',
      name: 'Exchange Integration',
      email: 'exchange@example.com',
      apiKey: 'xlc_key_987654321',
      status: 'active',
      rateLimits: {
        requests: 5000,
        period: '1m'
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      lastActive: new Date(Date.now() - 600000).toISOString()
    }
  ] as APIUser[];
};

export default function UsersPanel() {
  const [selectedUser, setSelectedUser] = useState<APIUser | null>(null);
  const { data: users, isLoading, error } = useQuery('apiUsers', fetchAPIUsers);

  const handleRegenerateKey = (userId: string) => {
    // Implement API key regeneration
    console.log('Regenerating API key for user:', userId);
  };

  const handleUpdateStatus = (userId: string, newStatus: 'active' | 'suspended') => {
    // Implement status update
    console.log('Updating status for user:', userId, 'to:', newStatus);
  };

  const handleUpdateRateLimits = (userId: string) => {
    // Implement rate limit update
    console.log('Updating rate limits for user:', userId);
  };

  if (error) {
    return <div className="text-red-600">Error loading API users</div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">API Users</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <User className="h-4 w-4 mr-2" />
            Add New API User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading users...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    API Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate Limits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <code className="text-sm text-gray-600">{user.apiKey}</code>
                        <button
                          onClick={() => handleRegenerateKey(user.id)}
                          className="ml-2 text-gray-400 hover:text-indigo-600"
                          title="Regenerate API Key"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.rateLimits.requests} req/{user.rateLimits.period}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastActive).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleUpdateRateLimits(user.id)}
                          className="text-gray-400 hover:text-indigo-600"
                          title="Update Rate Limits"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRegenerateKey(user.id)}
                          className="text-gray-400 hover:text-indigo-600"
                          title="Regenerate API Key"
                        >
                          <Key className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(user.id, user.status === 'active' ? 'suspended' : 'active')}
                          className="text-gray-400 hover:text-red-600"
                          title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}