import { useState } from 'react';
import { UserFilters } from '../types';

const defaultFilters: UserFilters = {
  search: '',
  status: '',
};

export function useUserFilters() {
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);

  const updateFilters = (newFilters: UserFilters) => {
    setFilters(newFilters);
  };

  return { filters, updateFilters };
}