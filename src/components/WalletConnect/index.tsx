import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../web3/WalletContext';
import AccountSelector from '../../web3/components/AccountSelector';

export default function WalletConnect() {
  const { address, isConnecting, error, connectWallet, disconnectWallet } = useWallet();

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        {error.message}
      </div>
    );
  }

  if (address) {
    return (
      <div className="flex items-center space-x-2">
        <AccountSelector />
        <button
          onClick={disconnectWallet}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}