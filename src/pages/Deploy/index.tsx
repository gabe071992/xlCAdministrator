import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import ContractDashboard from './components/ContractDashboard';
import XLCIntegration from './components/XLCIntegration';
import TokenDeployment from './components/TokenDeployment';
import ContractRegistry from './components/ContractRegistry';
import SecurityControls from './components/SecurityControls';

export default function Deploy() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Contract Deployment</h1>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="dashboard">Contract Dashboard</TabsTrigger>
          <TabsTrigger value="xlc">XLC Integration</TabsTrigger>
          <TabsTrigger value="token">Token Deployment</TabsTrigger>
          <TabsTrigger value="registry">Contract Registry</TabsTrigger>
          <TabsTrigger value="security">Security Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ContractDashboard />
        </TabsContent>

        <TabsContent value="xlc">
          <XLCIntegration />
        </TabsContent>

        <TabsContent value="token">
          <TokenDeployment />
        </TabsContent>

        <TabsContent value="registry">
          <ContractRegistry />
        </TabsContent>

        <TabsContent value="security">
          <SecurityControls />
        </TabsContent>
      </Tabs>
    </div>
  );
}