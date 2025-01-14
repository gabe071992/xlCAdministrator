export interface WalletState {
  address: string | null;
  accounts: string[];
  chainId: number | null;
  isConnecting: boolean;
  error: Error | null;
}

export interface Web3Error extends Error {
  code?: number;
}