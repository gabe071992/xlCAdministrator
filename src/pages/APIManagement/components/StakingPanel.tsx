import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Lock, Unlock, Edit2, Trash2, Plus, RefreshCw } from 'lucide-react';
import ErrorBoundary from '../../../components/ErrorBoundary';

interface StakingPool {
  id: string;
  name: string;
  totalStaked: number;
  apy: number;
  minStakeAmount: number;
  lockPeriod: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

// Simulated API call - replace with actual API integration
const fetchStakingPools = async (): Promise<StakingPool[]> => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: '1',
      name: 'Standard Pool',
      totalStaked: 1000000,
      apy: 12.5,
      minStakeAmount: 1000,
      lockPeriod: 30,
      active: true,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'Premium Pool',
      totalStaked: 5000000,
      apy: 18.75,
      minStakeAmount: 5000,
      lockPeriod: 90,
      active: true,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

export default function StakingPanel() {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const { data: pools, isLoading, error, refetch } = useQuery('stakingPools', fetchStakingPools);

  const handleCreatePool = () => {
    // Implement pool creation
    console.log('Creating new staking pool');
  };

  const handleEditPool = (pool: StakingPool) => {
    setSelectedPool(pool);
    // Implement pool editing
    console.log('Editing pool:', pool.id);
  };

  const handleDeletePool = (poolId: string) => {
    // Implement pool deletion
    console.log('Deleting pool:', poolId);
  };

  const handleTogglePool = (poolId: string, currentStatus: boolean) => {
    // Implement pool status toggle
    console.log('Toggling pool status:', poolId, 'to:', !currentStatus);
  };

  if (error) {
    return <div className="text-red-600">Error loading staking pools</div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Staking Pools</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={handleCreatePool}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Pool
            </button>
          </div>
        </div>

        {/* Staking Pools Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Loading staking pools...
            </div>
          ) : pools?.map((pool) => (
            <div
              key={pool.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pool.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pool.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {pool.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTogglePool(pool.id, pool.active)}
                    className="text-gray-400 hover:text-indigo-600"
                    title={pool.active ? 'Deactivate Pool' : 'Activate Pool'}
                  >
                    {pool.active ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditPool(pool)}
                    className="text-gray-400 hover:text-indigo-600"
                    title="Edit Pool"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePool(pool.id)}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete Pool"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">APY</span>
                  <span className="font-medium text-green-600">{pool.apy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Staked</span>
                  <span className="font-medium">{pool.totalStaked.toLocaleString()} XLC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Min. Stake</span>
                  <span className="font-medium">{pool.minStakeAmount.toLocaleString()} XLC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lock Period</span>
                  <span className="font-medium">{pool.lockPeriod} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Start Date</span>
                  <span className="font-medium">
                    {new Date(pool.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">End Date</span>
                  <span className="font-medium">
                    {new Date(pool.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <button
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                    onClick={() => console.log('View pool details:', pool.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                    onClick={() => console.log('View stakers:', pool.id)}
                  >
                    View Stakers
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}