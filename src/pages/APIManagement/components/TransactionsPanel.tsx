import React, { useState } from 'react';
import { Search, Filter, RefreshCw, Eye, XCircle, CheckCircle } from 'lucide-react';
import { useQuery } from 'react-query';
import { Transaction } from '../types';
import ErrorBoundary from '../../../components/ErrorBoundary';

// Simulated API call - replace with actual API integration
const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: '1',
      userId: 'user_123',
      type: 'API_CALL',
      status: 'success',
      amount: 1000,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      details: {
        endpoint: '/api/v1/balance',
        method: 'GET',
        responseTime: 123
      }
    },
    {
      id: '2',
      userId: 'user_456',
      type: 'TOKEN_TRANSFER',
      status: 'pending',
      amount: 500,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      details: {
        endpoint: '/api/v1/transfer',
        method: 'POST',
        responseTime: 245
      }
    },
    {
      id: '3',
      userId: 'user_789',
      type: 'STAKE',
      status: 'failed',
      amount: 2500,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      details: {
        endpoint: '/api/v1/stake',
        method: 'POST',
        responseTime: 89,
        error: 'Insufficient balance'
      }
    }
  ] as Transaction[];
};

export default function TransactionsPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const { data: transactions, isLoading, error, refetch } = useQuery('apiTransactions', fetchTransactions);

  const filteredTransactions = transactions?.filter(tx => {
    const matchesSearch = searchTerm === '' || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (txId: string) => {
    // Implement transaction details view
    console.log('Viewing transaction details:', txId);
  };

  const handleRetry = (txId: string) => {
    // Implement transaction retry
    console.log('Retrying transaction:', txId);
  };

  if (error) {
    return <div className="text-red-600">Error loading transactions</div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading transactions...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions?.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">{tx.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tx.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tx.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tx.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : tx.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(tx.id)}
                          className="text-gray-400 hover:text-indigo-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {tx.status === 'failed' && (
                          <button
                            onClick={() => handleRetry(tx.id)}
                            className="text-gray-400 hover:text-indigo-600"
                            title="Retry Transaction"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}