import React, { useState } from 'react';
import { Link2, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'mapped' | 'verified';
  securityScore: number;
}

export default function XLCIntegration() {
  const [features] = useState<Feature[]>([
    {
      id: '1',
      name: 'Token Transfer',
      description: 'Standard ERC20 transfer functionality',
      status: 'verified',
      securityScore: 95
    },
    {
      id: '2',
      name: 'Liquidity Pool',
      description: 'Automated market maker pool integration',
      status: 'mapped',
      securityScore: 85
    },
    {
      id: '3',
      name: 'Staking Mechanism',
      description: 'Token staking and rewards distribution',
      status: 'pending',
      securityScore: 75
    }
  ]);

  const getStatusIcon = (status: Feature['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'mapped':
        return <Link2 className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Feature['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'mapped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getSecurityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Feature Mapping */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Link2 className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Feature Mapping</h2>
        </div>

        <div className="space-y-4">
          {features.map(feature => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(feature.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{feature.name}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                  {feature.status}
                </span>
                <span className={`text-sm font-medium ${getSecurityColor(feature.securityScore)}`}>
                  {feature.securityScore}% secure
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Audit */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Security Audit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Access Control</h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">98%</p>
            <p className="mt-1 text-sm text-green-600">All checks passed</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">Vulnerability Scan</h3>
            <p className="mt-1 text-2xl font-semibold text-yellow-600">85%</p>
            <p className="mt-1 text-sm text-yellow-600">2 minor issues found</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Code Quality</h3>
            <p className="mt-1 text-2xl font-semibold text-blue-600">92%</p>
            <p className="mt-1 text-sm text-blue-600">High quality code</p>
          </div>
        </div>
      </div>

      {/* Registry Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-medium">Registry Management</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Contract Registry</h3>
              <p className="text-sm text-gray-500">Manage contract addresses and versions</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Registry
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Feature Registry</h3>
              <p className="text-sm text-gray-500">Manage feature mappings and dependencies</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Features
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Version Control</h3>
              <p className="text-sm text-gray-500">Manage contract versions and upgrades</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Versions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}