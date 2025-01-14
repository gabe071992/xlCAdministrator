import React from 'react';
import { Wallet, Users, ArrowUpDown, Flame } from 'lucide-react';
import StatCard from './StatCard';
import { useWallet } from '../../../web3/WalletContext';
import { useQuery } from 'react-query';
import { getXLCBalance } from '../../../lib/web3';
import ErrorBoundary from '../../../components/ErrorBoundary';

export default function StatsOverview() {
  const { address } = useWallet();
  const { data: balance, isLoading, error } = useQuery(
    ['xlcBalance', address],
    () => getXLCBalance(address || ''),
    {
      enabled: !!address,
      retry: 1,
      refetchInterval: 30000
    }
  );

  const displayValue = error ? 'N/A' : (isLoading ? 'Loading...' : (balance || 'N/A'));

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Supply"
          value={`${displayValue}${!error && balance ? ' XLC' : ''}`}
          icon={Wallet}
        />
        <StatCard
          title="Active Users"
          value="2,345"
          icon={Users}
          change={5.2}
        />
        <StatCard
          title="24h Transactions"
          value="1,234"
          icon={ArrowUpDown}
          change={-1.5}
        />
        <StatCard
          title="Tokens Burned"
          value="50,000 XLC"
          icon={Flame}
          change={3.2}
        />
      </div>
    </ErrorBoundary>
  );
}