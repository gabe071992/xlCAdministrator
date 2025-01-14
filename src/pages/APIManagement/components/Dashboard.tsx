import React from 'react';
import { Activity, AlertTriangle, Users, ArrowUpDown, Percent, Database } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import { useQuery } from 'react-query';
import { getSystemMetrics } from '../services/metrics';
import ErrorBoundary from '../../../components/ErrorBoundary';

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery('apiMetrics', getSystemMetrics, {
    refetchInterval: 30000
  });

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="API Health"
            value={isLoading ? 'Loading...' : metrics?.health || 'Healthy'}
            icon={Activity}
            change={metrics?.healthChange}
          />
          <StatCard
            title="Request Volume"
            value={isLoading ? 'Loading...' : metrics?.requestVolume?.toString() || '0'}
            icon={ArrowUpDown}
            change={metrics?.volumeChange}
          />
          <StatCard
            title="Error Rate"
            value={isLoading ? 'Loading...' : `${metrics?.errorRate || 0}%`}
            icon={AlertTriangle}
            change={metrics?.errorChange}
          />
          <StatCard
            title="Active Users"
            value={isLoading ? 'Loading...' : metrics?.activeUsers?.toString() || '0'}
            icon={Users}
            change={metrics?.userChange}
          />
          <StatCard
            title="Success Rate"
            value={isLoading ? 'Loading...' : `${metrics?.successRate || 0}%`}
            icon={Percent}
            change={metrics?.successChange}
          />
          <StatCard
            title="Cache Hit Rate"
            value={isLoading ? 'Loading...' : `${metrics?.cacheHitRate || 0}%`}
            icon={Database}
            change={metrics?.cacheChange}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Loading activity...</div>
            ) : metrics?.recentActivity?.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.type === 'error' ? 'bg-red-100 text-red-800' :
                      activity.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {activity.type}
                    </span>
                    <p className="ml-3 text-sm text-gray-900">{activity.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}