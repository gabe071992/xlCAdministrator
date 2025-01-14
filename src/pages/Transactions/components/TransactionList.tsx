import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatAddress } from '../../../utils/format';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Hash
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <a
                    href={`https://bscscan.com/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    {formatAddress(tx.hash)}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={`https://bscscan.com/address/${tx.from}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-indigo-600"
                >
                  {formatAddress(tx.from)}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={`https://bscscan.com/address/${tx.to}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-indigo-600"
                >
                  {formatAddress(tx.to)}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-gray-900">{tx.amount} XLC</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {new Date(tx.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}