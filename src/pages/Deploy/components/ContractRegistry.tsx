import React, { useState } from 'react';
import { List, CheckCircle2, AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { ContractRegistry as ContractRegistryType } from '../types';

export default function ContractRegistry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts] = useState<ContractRegistryType[]>([
    {
      id: '1',
      name: 'XLC Token',
      address: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'BSC Mainnet',
      version: '1.0.0',
      deployedAt: new Date().toISOString(),
      features: ['ERC20', 'Burnable', 'Pausable'],
      verified: true,
      audited: true
    },
    {
      id: '2',
      name: 'Staking Pool',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      network: 'BSC Mainnet',
      version: '1.1.0',
      deployedAt: new Date(Date.now() - 86400000).toISOString(),
      features: ['Staking', 'Rewards', 'Emergency Withdraw'],
      verified: true,
      audited: false
    },
    {
      id: '3',
      name: 'Liquidity Pool',
      address: '0x7890abcdef1234567890abcdef1234567890abcd',
      network: 'BSC Mainnet',
      version: '1.0.1',
      deployedAt: new Date(Date.now() - 172800000).toISOString(),
      features: ['AMM', 'Fee Collection', 'Emergency Pause'],
      verified: false,
      audited: false
    }
  ]);

  const filteredContracts = contracts.filter(contract =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.features.some(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contracts by name, address, or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Contract List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <List className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Registered Contracts</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{contract.name}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <a
                      href={`https://bscscan.com/address/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-indigo-600 flex items-center"
                    >
                      {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{contract.network}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">v{contract.version}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {contract.verified && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-5 w-5 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                  {contract.audited ? (
                    <div className="flex items-center text-green-600">
                      <Shield className="h-5 w-5 mr-1" />
                      <span className="text-sm">Audited</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="text-sm">Unaudited</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Features</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {contract.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>
                  Deployed: {new Date(contract.deployedAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-4">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Update Registry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}