import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import OffersManagement from './components/OffersManagement';
import StakingDashboard from './components/StakingDashboard';
import RewardsOverview from './components/RewardsOverview';

export default function Distribution() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Distribution & Rewards</h1>
      </div>

      <Tabs defaultValue="offers" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="offers">Offers & Loyalty</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="offers">
          <OffersManagement />
        </TabsContent>

        <TabsContent value="staking">
          <StakingDashboard />
        </TabsContent>

        <TabsContent value="rewards">
          <RewardsOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}