import React from 'react';
import { useTransactions } from './hooks/useTransactions';
import TransactionList from './components/TransactionList';
import { useWallet } from '../../web3/WalletContext';

export default function Transactions() {
  const { address } = useWallet();
  const { data: transactions, isLoading, error } = useTransactions();

  if (!address) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please connect your wallet to view transactions</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading transactions. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      
      {transactions && transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No transactions found</p>
        </div>
      )}
    </div>
  );
}