import { useState } from 'react';
import { authService } from '../../../auth/authService';
import { LoginCredentials } from '../../../auth/types';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const credentials: LoginCredentials = { email, password };
      const { user, error } = await authService.login(credentials);
      if (error) {
        setError(error);
        return false;
      }
      return true;
    } catch (error) {
      setError('Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login: handleLogin, error, isLoading };
}