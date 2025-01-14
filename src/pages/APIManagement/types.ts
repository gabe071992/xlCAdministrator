export interface APIMetrics {
  health: string;
  healthChange: number;
  requestVolume: number;
  volumeChange: number;
  errorRate: number;
  errorChange: number;
  activeUsers: number;
  userChange: number;
  successRate: number;
  successChange: number;
  cacheHitRate: number;
  cacheChange: number;
  recentActivity: Activity[];
}

export interface Activity {
  type: 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export interface APIUser {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  status: 'active' | 'suspended' | 'pending';
  rateLimits: {
    requests: number;
    period: string;
  };
  createdAt: string;
  lastActive: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  timestamp: string;
  details: Record<string, any>;
}

export interface SystemConfig {
  rateLimits: {
    default: number;
    premium: number;
    period: string;
  };
  security: {
    ipWhitelist: string[];
    webhookUrl: string;
    apiKeyExpiration: number;
  };
  caching: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
}