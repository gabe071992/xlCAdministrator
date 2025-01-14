import React from 'react';
import { UserFilters as FilterType } from '../types';

interface UserFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

export default function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-x-4 flex items-center">
      <input
        type="text"
        placeholder="Search users..."
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  );
}