import React from 'react';
import { useQuery } from 'react-query';
import UserList from './components/UserList';
import UserFilters from './components/UserFilters';
import { useUserFilters } from './hooks/useUserFilters';
import { fetchUsers } from './api/users';

export default function Users() {
  const { filters, updateFilters } = useUserFilters();
  const { data: users, isLoading } = useQuery(
    ['users', filters],
    () => fetchUsers(filters)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      </div>
      
      <UserFilters filters={filters} onFilterChange={updateFilters} />
      <UserList users={users} isLoading={isLoading} />
    </div>
  );
}