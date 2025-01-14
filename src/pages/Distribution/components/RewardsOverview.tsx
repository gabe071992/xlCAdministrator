import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../lib/firebase';
import { Reward } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Award, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function RewardsOverview() {
  const [rewards, setRewards] = useState<Record<string, Reward>>({});

  useEffect(() => {
    const rewardsRef = ref(db, 'rewards');
    const unsubscribe = onValue(rewardsRef, (snapshot) => {
      if (snapshot.exists()) {
        setRewards(snapshot.val());
      } else {
        setRewards({});
      }
    });

    return () => unsubscribe();
  }, []);

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'staking':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'offer':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'referral':
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Award className="h-5 w-5 text-gray-500" />;
    }
  };

  const stats = {
    total: Object.values(rewards).reduce((acc, reward) => acc + reward.amount, 0),
    pending: Object.values(rewards).filter(r => r.status === 'pending').length,
    claimed: Object.values(rewards).filter(r => r.status === 'claimed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-50 rounded-full">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Rewards</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.total.toLocaleString()} XLC</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Rewards</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Claimed Rewards</h3>
              <p className="text-2xl font-semibold text-gray-900">{stats.claimed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Rewards */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Rewards</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {Object.entries(rewards).map(([id, reward]) => (
            <div key={id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getRewardTypeIcon(reward.type)}
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {reward.amount.toLocaleString()} XLC
                    </p>
                    <p className="text-sm text-gray-500">
                      {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)} Reward
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reward.status === 'claimed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">
                    {formatDistanceToNow(new Date(reward.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  User ID: {reward.userId}
                </p>
                <p className="text-sm text-gray-500">
                  Source ID: {reward.sourceId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}