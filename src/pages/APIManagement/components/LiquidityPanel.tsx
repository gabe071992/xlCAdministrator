import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BarChart2, DollarSign, TrendingUp, RefreshCw, Eye, AlertTriangle } from 'lucide-react';
import ErrorBoundary from '../../../components/ErrorBoundary';

interface LiquidityPool {
  id: string;
  name: string;
  token0: {
    symbol: string;
    amount: number;
    value: number;
  };
  token1: {
    symbol: string;
    amount: number;
    value: number;
  };
  tvl: number;
  volume24h: number;
  fees24h: number;
  apy: number;
  priceImpact: number;
  lastUpdated: string;
}

// Simulated API call - replace with actual API integration
const fetchLiquidityPools = async (): Promise<LiquidityPool[]> => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: '1',
      name: 'XLC/USDT',
      token0: {
        symbol: 'XLC',
        amount: 1000000,
        value: 1000000
      },
      token1: {
        symbol: 'USDT',
        amount: 1000000,
        value: 1000000
      },
      tvl: 2000000,
      volume24h: 150000,
      fees24h: 450,
      apy: 24.5,
      priceImpact: 0.15,
      lastUpdated: new Date().toISOString()
    },
    {
      id: '2',
      name: 'XLC/BUSD',
      token0: {
        symbol: 'XLC',
        amount: 500000,
        value: 500000
      },
      token1: {
        symbol: 'BUSD',
        amount: 500000,
        value: 500000
      },
      tvl: 1000000,
      volume24h: 75000,
      fees24h: 225,
      apy: 18.75,
      priceImpact: 0.25,
      lastUpdated: new Date().toISOString()
    }
  ];
};

export default function LiquidityPanel() {
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null);
  const { data: pools, isLoading, error, refetch } = useQuery('liquidityPools', fetchLiquidityPools);

  const handleViewDetails = (pool: LiquidityPool) => {
    setSelectedPool(pool);
    // Implement pool details view
    console.log('Viewing pool details:', pool.id);
  };

  if (error) {
    return <div className="text-red-600">Error loading liquidity pools</div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Liquidity Pools</h2>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-50 rounded-full">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total TVL</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${pools?.reduce((sum, pool) => sum + pool.tvl, 0)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-full">
                <BarChart2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">24h Volume</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${pools?.reduce((sum, pool) => sum + pool.volume24h, 0)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">24h Fees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${pools?.reduce((sum, pool) => sum + pool.fees24h, 0)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-full">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Price Impact</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(pools?.reduce((sum, pool) => sum + pool.priceImpact, 0) / (pools?.length || 1)).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liquidity Pools */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading liquidity pools...</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pools?.map((pool) => (
                <div key={pool.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{pool.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Last updated: {new Date(pool.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewDetails(pool)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      Details
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Token Pair</p>
                      <div className="mt-1 flex justify-between">
                        <span className="text-sm text-gray-900">
                          {pool.token0.amount.toLocaleString()} {pool.token0.symbol}
                        </span>
                        <span className="text-sm text-gray-900">
                          {pool.token1.amount.toLocaleString()} {pool.token1.symbol}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">TVL</p>
                      <p className="mt-1 text-sm text-gray-900">
                        ${pool.tvl.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">24h Volume</p>
                      <p className="mt-1 text-sm text-gray-900">
                        ${pool.volume24h.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">APY</p>
                      <p className="mt-1 text-sm font-medium text-green-600">
                        {pool.apy.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">24h Fees</p>
                      <p className="mt-1 text-sm text-gray-900">
                        ${pool.fees24h.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Price Impact</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {pool.priceImpact.toFixed(2)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Token Ratio</p>
                      <p className="mt-1 text-sm text-gray-900">
                        1 {pool.token0.symbol} = {(pool.token1.value / pool.token0.value).toFixed(4)} {pool.token1.symbol}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}