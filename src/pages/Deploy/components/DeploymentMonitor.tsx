import React from 'react';
import { ExternalLink, CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import { DeploymentStatus } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface DeploymentMonitorProps {
  deployments: DeploymentStatus[];
}

export default function DeploymentMonitor({ deployments }: DeploymentMonitorProps) {
  const getStatusIcon = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'deploying':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'deploying':
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (deployments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No deployments yet. Select a template and configure parameters to deploy a contract.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getStatusIcon(deployment.status)}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {deployment.contractName}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(deployment.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
              {deployment.status}
            </span>
          </div>

          {deployment.address && (
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Contract Address:</span>
                <a
                  href={`https://bscscan.com/address/${deployment.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-mono flex items-center"
                >
                  {deployment.address}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          )}

          {deployment.txHash && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Transaction:</span>
                <a
                  href={`https://bscscan.com/tx/${deployment.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-mono flex items-center"
                >
                  {`${deployment.txHash.slice(0, 10)}...${deployment.txHash.slice(-8)}`}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          )}

          {deployment.error && (
            <div className="mt-4 p-3 bg-red-50 rounded-md">
              <p className="text-sm text-red-700">
                Error: {deployment.error}
              </p>
            </div>
          )}

          {deployment.status === 'success' && (
            <div className="mt-4 flex space-x-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-500">
                View Contract
              </button>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">
                Verify Contract
              </button>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">
                Add to Registry
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}