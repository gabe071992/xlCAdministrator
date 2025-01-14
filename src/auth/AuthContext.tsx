import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, AuthUser, LoginCredentials } from './types';
import { authService } from './authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ user: AuthUser | null; error: string | null }>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: authService.getUser(),
    token: null,
    isLoading: false,
    error: null
  });

  useEffect(() => {
    // Check authentication status on mount
    const user = authService.getUser();
    if (user) {
      setState(prev => ({ ...prev, user }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await authService.login(credentials);
      setState(prev => ({
        ...prev,
        user: result.user,
        isLoading: false,
        error: result.error ? new Error(result.error) : null
      }));
      return result;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        user: null,
        isLoading: false,
        error: new Error(error.message)
      }));
      return { user: null, error: error.message };
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } finally {
      setState({
        user: null,
        token: null,
        isLoading: false,
        error: null
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      isAdmin: () => authService.isAdmin(),
      isSuperAdmin: () => authService.isSuperAdmin()
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}