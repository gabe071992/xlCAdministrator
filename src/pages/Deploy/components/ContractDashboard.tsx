import React, { useState } from 'react';
import { FileCode, Settings, Activity, List } from 'lucide-react';
import { ContractTemplate, DeploymentStatus } from '../types';
import TemplateSelector from './TemplateSelector';
import ParameterConfig from './ParameterConfig';
import DeploymentMonitor from './DeploymentMonitor';

export default function ContractDashboard() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus[]>([]);

  const handleDeploy = async (parameters: Record<string, any>) => {
    if (!selectedTemplate) return;

    const newDeployment: DeploymentStatus = {
      id: crypto.randomUUID(),
      contractName: selectedTemplate.name,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setDeploymentStatus(prev => [newDeployment, ...prev]);

    try {
      // Implement deployment logic here
      console.log('Deploying contract with parameters:', parameters);
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <FileCode className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Contract Templates</h2>
        </div>
        <TemplateSelector onSelect={setSelectedTemplate} />
      </div>

      {/* Parameter Configuration */}
      {selectedTemplate && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium">Configure Parameters</h2>
          </div>
          <ParameterConfig
            template={selectedTemplate}
            onDeploy={handleDeploy}
          />
        </div>
      )}

      {/* Deployment Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Activity className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Deployment Status</h2>
        </div>
        <DeploymentMonitor deployments={deploymentStatus} />
      </div>

      {/* Contract Registry */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <List className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Contract Registry</h2>
        </div>
        {/* Add contract registry component */}
      </div>
    </div>
  );
}