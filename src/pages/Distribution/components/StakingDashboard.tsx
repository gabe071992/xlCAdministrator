import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Lock, Unlock } from 'lucide-react';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { db } from '../../../lib/firebase';
import { StakingPool, UserStake } from '../types';
import StakingPoolForm from './StakingPoolForm';
import toast from 'react-hot-toast';

export default function StakingDashboard() {
  const [pools, setPools] = useState<Record<string, StakingPool>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPool, setSelectedPool] = useState<{ id: string; pool: StakingPool } | null>(null);
  const [userStakes, setUserStakes] = useState<Record<string, UserStake>>({});

  useEffect(() => {
    const poolsRef = ref(db, 'stakingPools');
    const stakesRef = ref(db, 'userStakes');

    const unsubscribePools = onValue(poolsRef, (snapshot) => {
      if (snapshot.exists()) {
        setPools(snapshot.val());
      } else {
        setPools({});
      }
    });

    const unsubscribeStakes = onValue(stakesRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserStakes(snapshot.val());
      } else {
        setUserStakes({});
      }
    });

    return () => {
      unsubscribePools();
      unsubscribeStakes();
    };
  }, []);

  const handleSave = async (poolData: StakingPool) => {
    try {
      if (selectedPool) {
        await update(ref(db, `stakingPools/${selectedPool.id}`), poolData);
        toast.success('Staking pool updated successfully');
      } else {
        await push(ref(db, 'stakingPools'), poolData);
        toast.success('Staking pool created successfully');
      }
      setIsEditing(false);
      setSelectedPool(null);
    } catch (error) {
      console.error('Error saving staking pool:', error);
      toast.error('Failed to save staking pool');
    }
  };

  const handleDelete = async (poolId: string) => {
    try {
      await remove(ref(db, `stakingPools/${poolId}`));
      toast.success('Staking pool deleted successfully');
    } catch (error) {
      console.error('Error deleting staking pool:', error);
      toast.error('Failed to delete staking pool');
    }
  };

  const togglePoolStatus = async (poolId: string, currentStatus: boolean) => {
    try {
      await update(ref(db, `stakingPools/${poolId}`), {
        active: !currentStatus
      });
      toast.success(`Pool ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error toggling pool status:', error);
      toast.error('Failed to update pool status');
    }
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <StakingPoolForm
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setSelectedPool(null);
          }}
          initialData={selectedPool?.pool}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Staking Pools</h2>
              <p className="text-sm text-gray-500">Manage your staking pools and view statistics</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Pool
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(pools).map(([id, pool]) => (
              <div
                key={id}
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
                      onClick={() => togglePoolStatus(id, pool.active)}
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
                      onClick={() => {
                        setSelectedPool({ id, pool });
                        setIsEditing(true);
                      }}
                      className="text-gray-400 hover:text-indigo-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">APY</span>
                    <span className="font-medium text-green-600">{(pool.apy ?? 0).toLocaleString()}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Staked</span>
                    <span className="font-medium">{(pool.totalStaked ?? 0).toLocaleString()} XLC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min. Stake</span>
                    <span className="font-medium">{(pool.minStakeAmount ?? 0).toLocaleString()} XLC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lock Period</span>
                    <span className="font-medium">{pool.lockPeriod ?? 0} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Date</span>
                    <span className="font-medium">{pool.startDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">End Date</span>
                    <span className="font-medium">{pool.endDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Active Stakes</h4>
                  <div className="text-sm text-gray-500">
                    {Object.values(userStakes).filter(stake => stake.poolId === id && stake.status === 'active').length} active stakers
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}