import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ref, set } from 'firebase/database';
import { db } from '../../../lib/firebase';
import toast from 'react-hot-toast';
import { Tokenomics } from '../types';

export default function TokenomicsForm() {
  const [tokenomics, setTokenomics] = useState<Tokenomics>({
    totalSupply: '',
    circulatingSupply: '',
    burned: '',
    marketCap: '',
    fullyDilutedMarketCap: '',
    holders: '',
    transferTax: '',
    liquidityTax: '',
    marketingTax: '',
    devTax: '',
    liquidityPair: '',
    liquidityLocked: '',
    contractAddress: '',
    launchDate: '',
    initialPrice: '',
    allTimeHigh: '',
    allTimeLow: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await set(ref(db, 'tokenomics'), tokenomics);
      toast.success('Tokenomics updated successfully');
    } catch (error) {
      console.error('Error updating tokenomics:', error);
      toast.error('Failed to update tokenomics');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokenomics(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Update Tokenomics</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supply Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Supply
            </label>
            <input
              type="text"
              name="totalSupply"
              value={tokenomics.totalSupply}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 1,000,000,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Circulating Supply
            </label>
            <input
              type="text"
              name="circulatingSupply"
              value={tokenomics.circulatingSupply}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 750,000,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Burned Tokens
            </label>
            <input
              type="text"
              name="burned"
              value={tokenomics.burned}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 250,000,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Holders
            </label>
            <input
              type="text"
              name="holders"
              value={tokenomics.holders}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 10,000"
            />
          </div>

          {/* Market Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Market Cap
            </label>
            <input
              type="text"
              name="marketCap"
              value={tokenomics.marketCap}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. $1,000,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fully Diluted Market Cap
            </label>
            <input
              type="text"
              name="fullyDilutedMarketCap"
              value={tokenomics.fullyDilutedMarketCap}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. $1,500,000"
            />
          </div>

          {/* Tax Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transfer Tax (%)
            </label>
            <input
              type="text"
              name="transferTax"
              value={tokenomics.transferTax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Liquidity Tax (%)
            </label>
            <input
              type="text"
              name="liquidityTax"
              value={tokenomics.liquidityTax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marketing Tax (%)
            </label>
            <input
              type="text"
              name="marketingTax"
              value={tokenomics.marketingTax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Development Tax (%)
            </label>
            <input
              type="text"
              name="devTax"
              value={tokenomics.devTax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 1"
            />
          </div>

          {/* Liquidity Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Liquidity Pair
            </label>
            <input
              type="text"
              name="liquidityPair"
              value={tokenomics.liquidityPair}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. XLC/WBNB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Liquidity Locked Until
            </label>
            <input
              type="text"
              name="liquidityLocked"
              value={tokenomics.liquidityLocked}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 2025-12-31"
            />
          </div>

          {/* Contract Information */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Contract Address
            </label>
            <input
              type="text"
              name="contractAddress"
              value={tokenomics.contractAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 0x..."
            />
          </div>

          {/* Price Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Initial Price
            </label>
            <input
              type="text"
              name="initialPrice"
              value={tokenomics.initialPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. $0.001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Launch Date
            </label>
            <input
              type="text"
              name="launchDate"
              value={tokenomics.launchDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 2023-01-01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              All Time High
            </label>
            <input
              type="text"
              name="allTimeHigh"
              value={tokenomics.allTimeHigh}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. $0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              All Time Low
            </label>
            <input
              type="text"
              name="allTimeLow"
              value={tokenomics.allTimeLow}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. $0.0001"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}