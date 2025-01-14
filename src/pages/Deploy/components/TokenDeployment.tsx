import React, { useState } from 'react';
import { Coins, Settings, Shield, CheckCircle } from 'lucide-react';
import { TokenConfig } from '../types';

export default function TokenDeployment() {
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    name: '',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    features: {
      burnable: false,
      mintable: false,
      pausable: false,
      upgradeable: false,
      accessControl: false
    },
    distribution: {
      team: 15,
      advisors: 10,
      publicSale: 40,
      liquidity: 25,
      marketing: 10
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implement token deployment logic
      console.log('Deploying token with config:', tokenConfig);
    } catch (error) {
      console.error('Token deployment failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Coins className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium">Token Information</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token Name
              </label>
              <input
                type="text"
                value={tokenConfig.name}
                onChange={(e) => setTokenConfig({ ...tokenConfig, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token Symbol
              </label>
              <input
                type="text"
                value={tokenConfig.symbol}
                onChange={(e) => setTokenConfig({ ...tokenConfig, symbol: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Decimals
              </label>
              <input
                type="number"
                value={tokenConfig.decimals}
                onChange={(e) => setTokenConfig({ ...tokenConfig, decimals: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Supply
              </label>
              <input
                type="text"
                value={tokenConfig.totalSupply}
                onChange={(e) => setTokenConfig({ ...tokenConfig, totalSupply: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium">Token Features</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(tokenConfig.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  checked={enabled}
                  onChange={(e) => setTokenConfig({
                    ...tokenConfig,
                    features: {
                      ...tokenConfig.features,
                      [feature]: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={feature} className="ml-2 block text-sm text-gray-900 capitalize">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium">Token Distribution</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(tokenConfig.distribution).map(([category, percentage]) => (
              <div key={category}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {category} (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setTokenConfig({
                    ...tokenConfig,
                    distribution: {
                      ...tokenConfig.distribution,
                      [category]: parseFloat(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Deploy Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Deploy Token
          </button>
        </div>
      </form>
    </div>
  );
}