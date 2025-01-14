import React, { useState } from 'react';
import { StakingPool } from '../types';

interface StakingPoolFormProps {
  onSave: (pool: StakingPool) => void;
  onCancel: () => void;
  initialData?: StakingPool;
}

export default function StakingPoolForm({ onSave, onCancel, initialData }: StakingPoolFormProps) {
  const [pool, setPool] = useState<StakingPool>(initialData || {
    id: crypto.randomUUID(),
    name: '',
    totalStaked: 0,
    apy: 0,
    minStakeAmount: 0,
    lockPeriod: 0,
    active: true,
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pool);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {initialData ? 'Edit Staking Pool' : 'Create New Staking Pool'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pool Name
            </label>
            <input
              type="text"
              value={pool.name}
              onChange={(e) => setPool({ ...pool, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              APY (%)
            </label>
            <input
              type="number"
              value={pool.apy}
              onChange={(e) => setPool({ ...pool, apy: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Stake Amount (XLC)
            </label>
            <input
              type="number"
              value={pool.minStakeAmount}
              onChange={(e) => setPool({ ...pool, minStakeAmount: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lock Period (days)
            </label>
            <input
              type="number"
              value={pool.lockPeriod}
              onChange={(e) => setPool({ ...pool, lockPeriod: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={pool.startDate}
              onChange={(e) => setPool({ ...pool, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={pool.endDate}
              onChange={(e) => setPool({ ...pool, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={pool.active.toString()}
              onChange={(e) => setPool({ ...pool, active: e.target.value === 'true' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {initialData ? 'Update Pool' : 'Create Pool'}
          </button>
        </div>
      </form>
    </div>
  );
}