
import { AuthToken, AuthUser, LoginCredentials } from './types';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

interface LoginResponse {
  user: AuthUser | null;
  error: string | null;
}

class AuthService {
  private token: AuthToken | null = null;
  private user: AuthUser | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const tokenStr = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);

    if (tokenStr) {
      this.token = JSON.parse(tokenStr);
      if (this.token && this.token.expiresAt < Date.now()) {
        this.clearAuth();
        return;
      }
    }

    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  private saveToStorage(): void {
    if (this.token) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(this.token));
    }
    if (this.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(this.user));
    }
  }

  private clearAuth(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch('https://xlcapi.replit.app/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.token = {
        token: data.token,
        expiresAt: Date.now() + 3600000 // 1 hour expiry
      };
      this.user = {
        id: data.userId,
        role: data.role || 'user'
      };
      this.saveToStorage();

      return { user: this.user, error: null };
    } catch (error: any) {
      this.clearAuth();
      return { user: null, error: error.message || 'Login failed' };
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        await fetch('https://xlcapi.replit.app/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token.token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  getToken(): string | null {
    return this.token?.token || null;
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!(this.token && this.user);
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin' || this.user?.role === 'super_admin';
  }

  isSuperAdmin(): boolean {
    return this.user?.role === 'super_admin';
  }
}

const authService = new AuthService();
export { authService };
