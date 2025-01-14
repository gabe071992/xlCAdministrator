import { useQuery } from 'react-query';
import { useWallet } from '../../../web3/hooks/useWallet';
import { getXLCBalance } from '../../../lib/web3';

export function useAccountBalance() {
  const { address } = useWallet();

  return useQuery(
    ['xlcBalance', address],
    () => address ? getXLCBalance(address) : '0',
    {
      enabled: !!address,
      refetchInterval: 30000, // Refresh every 30 seconds
    }
  );