import { APIMetrics, Activity } from '../types';

// Simulated API call - replace with actual API integration
export async function getSystemMetrics(): Promise<APIMetrics> {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data
  return {
    health: 'Healthy',
    healthChange: 0,
    requestVolume: 15234,
    volumeChange: 12.5,
    errorRate: 0.5,
    errorChange: -2.3,
    activeUsers: 1250,
    userChange: 5.7,
    successRate: 99.5,
    successChange: 0.2,
    cacheHitRate: 85.3,
    cacheChange: 3.1,
    recentActivity: [
      {
        type: 'success',
        message: 'API rate limit updated successfully',
        timestamp: new Date().toISOString()
      },
      {
        type: 'warning',
        message: 'High request volume detected',
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        type: 'error',
        message: 'Failed authentication attempt from unauthorized IP',
        timestamp: new Date(Date.now() - 600000).toISOString()
      }
    ]
  };
}