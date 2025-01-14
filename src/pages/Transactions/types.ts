export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
  blockNumber: number;
}