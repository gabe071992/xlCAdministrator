import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatAddress } from '../../utils/format';

export default function AccountSelector() {
  const { accounts, address, switchAccount, addAccount } = useWallet();

  return (
    <div className="relative inline-block">
      <div className="flex items-center space-x-2">
        <button
          onClick={addAccount}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          title="Add account"
        >
          <Plus className="w-4 h-4" />
        </button>
        
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => document.getElementById('account-dropdown')?.classList.toggle('hidden')}
        >
          {address ? formatAddress(address) : 'Select Account'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div
        id="account-dropdown"
        className="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
      >
        <div className="py-1" role="menu">
          {accounts.map((account) => (
            <button
              key={account}
              className={`block w-full text-left px-4 py-2 text-sm ${
                account === address
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                switchAccount(account);
                document.getElementById('account-dropdown')?.classList.add('hidden');
              }}
            >
              {formatAddress(account)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}