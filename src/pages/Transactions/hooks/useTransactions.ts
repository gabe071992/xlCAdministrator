import { useQuery } from 'react-query';
import { getTransactions } from '../../../lib/web3';
import { useWallet } from '../../../web3/WalletContext';
import type { Transaction } from '../types';

export function useTransactions(limit = 100) {
  const { address } = useWallet();

  return useQuery<Transaction[]>(
    ['transactions', limit],
    () => getTransactions(limit),
    {
      enabled: !!address, // Only fetch when wallet is connected
      refetchInterval: 30000,
      retry: 2,
      initialData: [],
      onError: (error) => {
        console.error('Failed to fetch transactions:', error);
      }
    }
  );
}