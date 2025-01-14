import React from 'react';
import { useQuery } from 'react-query';
import { 
  Wallet, 
  Users as UsersIcon, 
  ArrowUpDown
} from 'lucide-react';
import { xlcContract, web3 } from '../../lib/web3';
import { getTokenHolderCount } from '../../lib/web3/stats';
import { useWallet } from '../../web3/WalletContext';
import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const { address } = useWallet();
  
  const { data: totalSupply, isLoading: supplyLoading } = useQuery('totalSupply', async () => {
    try {
      const supply = await xlcContract.methods.totalSupply().call();
      return web3.utils.fromWei(supply, 'ether');
    } catch (error) {
      console.error('Error fetching total supply:', error);
      return 'N/A';
    }
  });

  const { data: balance } = useQuery(
    ['xlcBalance', address],
    async () => {
      if (!address) return null;
      const bal = await xlcContract.methods.balanceOf(address).call();
      return web3.utils.fromWei(bal, 'ether');
    },
    { 
      enabled: !!address,
      refetchInterval: 30000 // Refresh every 30 seconds
    }
  );

  const { data: holderCount, isLoading: holdersLoading } = useQuery('holderCount', getTokenHolderCount);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Supply"
          value={supplyLoading ? 'Loading...' : `${totalSupply} XLC`}
          subValue={balance ? `Your Balance: ${balance} XLC` : undefined}
          icon={Wallet}
          change={2.5}
        />
        <StatCard
          title="Token Holders"
          value={holdersLoading ? 'Loading...' : holderCount?.toString() || 'N/A'}
          icon={UsersIcon}
          change={5.2}
        />
        <StatCard
          title="24h Transactions"
          value="1,234"
          icon={ArrowUpDown}
          change={-1.5}
        />
      </div>
    </div>
  );
}