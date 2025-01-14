import React, { useState } from 'react';
import { Shield, Key, AlertTriangle, FileText } from 'lucide-react';
import { SecurityControl } from '../types';

export default function SecurityControls() {
  const [controls, setControls] = useState<SecurityControl[]>([
    {
      id: '1',
      type: 'access',
      name: 'Admin Access Control',
      description: 'Manage deployment permissions for admin users',
      enabled: true,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    },
    {
      id: '2',
      type: 'approval',
      name: 'Multi-Signature Approval',
      description: 'Require multiple signatures for contract deployment',
      enabled: true,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    },
    {
      id: '3',
      type: 'emergency',
      name: 'Emergency Pause',
      description: 'Pause all contract deployments in case of emergency',
      enabled: false,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    },
    {
      id: '4',
      type: 'audit',
      name: 'Deployment Audit Log',
      description: 'Track all deployment activities and changes',
      enabled: true,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    }
  ]);

  const handleToggleControl = (controlId: string) => {
    setControls(prev => prev.map(control => 
      control.id === controlId
        ? { ...control, enabled: !control.enabled, lastUpdated: new Date().toISOString() }
        : control
    ));
  };

  const getIcon = (type: SecurityControl['type']) => {
    switch (type) {
      case 'access':
        return <Key className="h-5 w-5" />;
      case 'approval':
        return <Shield className="h-5 w-5" />;
      case 'emergency':
        return <AlertTriangle className="h-5 w-5" />;
      case 'audit':
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {controls.map(control => (
          <div key={control.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  control.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {getIcon(control.type)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{control.name}</h3>
                  <p className="text-sm text-gray-500">{control.description}</p>
                </div>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={control.enabled}
                    onChange={() => handleToggleControl(control.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {new Date(control.lastUpdated).toLocaleString()} by {control.updatedBy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}