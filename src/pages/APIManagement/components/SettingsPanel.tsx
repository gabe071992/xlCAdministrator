import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Save, RefreshCw, Shield, Globe, Database, Bell } from 'lucide-react';
import { SystemConfig } from '../types';
import ErrorBoundary from '../../../components/ErrorBoundary';
import toast from 'react-hot-toast';

// Simulated API call - replace with actual API integration
const fetchSystemConfig = async (): Promise<SystemConfig> => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return {
    rateLimits: {
      default: 1000,
      premium: 5000,
      period: '1m'
    },
    security: {
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      webhookUrl: 'https://api.example.com/webhook',
      apiKeyExpiration: 90
    },
    caching: {
      enabled: true,
      ttl: 300,
      maxSize: 1000
    }
  };
};

export default function SettingsPanel() {
  const { data: config, isLoading, error } = useQuery('systemConfig', fetchSystemConfig);
  const [formData, setFormData] = useState<SystemConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'rate-limits' | 'security' | 'caching'>('rate-limits');

  React.useEffect(() => {
    if (config && !formData) {
      setFormData(config);
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implement settings update
      console.log('Updating settings:', formData);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  };

  const handleInputChange = (section: keyof SystemConfig, field: string, value: any) => {
    if (!formData) return;
    
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  if (error) {
    return <div className="text-red-600">Error loading system configuration</div>;
  }

  if (isLoading || !formData) {
    return <div className="text-center py-12">Loading settings...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">System Settings</h2>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Settings Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('rate-limits')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rate-limits'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Globe className="h-4 w-4 inline-block mr-2" />
              Rate Limits
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-4 w-4 inline-block mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('caching')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'caching'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Database className="h-4 w-4 inline-block mr-2" />
              Caching
            </button>
          </nav>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'rate-limits' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Rate Limiting</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Default Rate Limit (requests)
                  </label>
                  <input
                    type="number"
                    value={formData.rateLimits.default}
                    onChange={(e) => handleInputChange('rateLimits', 'default', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Premium Rate Limit (requests)
                  </label>
                  <input
                    type="number"
                    value={formData.rateLimits.premium}
                    onChange={(e) => handleInputChange('rateLimits', 'premium', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Period
                  </label>
                  <select
                    value={formData.rateLimits.period}
                    onChange={(e) => handleInputChange('rateLimits', 'period', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="1m">1 Minute</option>
                    <option value="5m">5 Minutes</option>
                    <option value="15m">15 Minutes</option>
                    <option value="1h">1 Hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    IP Whitelist (one per line)
                  </label>
                  <textarea
                    value={formData.security.ipWhitelist.join('\n')}
                    onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value.split('\n'))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={formData.security.webhookUrl}
                    onChange={(e) => handleInputChange('security', 'webhookUrl', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    API Key Expiration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.security.apiKeyExpiration}
                    onChange={(e) => handleInputChange('security', 'apiKeyExpiration', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'caching' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Cache Configuration</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.caching.enabled}
                    onChange={(e) => handleInputChange('caching', 'enabled', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable Caching
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cache TTL (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.caching.ttl}
                    onChange={(e) => handleInputChange('caching', 'ttl', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Cache Size (items)
                  </label>
                  <input
                    type="number"
                    value={formData.caching.maxSize}
                    onChange={(e) => handleInputChange('caching', 'maxSize', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  );
}