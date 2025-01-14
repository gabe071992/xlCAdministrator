export interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  apiKeys?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: AuthToken | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  lastUsed?: string;
  quota: {
    limit: number;
    remaining: number;
    resetAt: string;
  };
}