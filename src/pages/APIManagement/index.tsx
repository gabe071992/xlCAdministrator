import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import Dashboard from './components/Dashboard';
import UsersPanel from './components/UsersPanel';
import TransactionsPanel from './components/TransactionsPanel';
import StakingPanel from './components/StakingPanel';
import LiquidityPanel from './components/LiquidityPanel';
import SettingsPanel from './components/SettingsPanel';

export default function APIManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">API Management</h1>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>

        <TabsContent value="users">
          <UsersPanel />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsPanel />
        </TabsContent>

        <TabsContent value="staking">
          <StakingPanel />
        </TabsContent>

        <TabsContent value="liquidity">
          <LiquidityPanel />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}