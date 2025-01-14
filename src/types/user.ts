export interface User {
  id: string;
  email: string;
  walletAddress: string;
  balance: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface UserFilters {
  search: string;
  status: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  change: number;
}