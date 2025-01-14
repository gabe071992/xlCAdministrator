import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../lib/firebase';
import { Tokenomics } from '../types';
import { Coins, Users, Flame, Percent, Calendar, DollarSign, ArrowUpDown } from 'lucide-react';

export default function TokenomicsDisplay() {
  const [tokenomics, setTokenomics] = useState<Tokenomics | null>(null);

  useEffect(() => {
    const tokenomicsRef = ref(db, 'tokenomics');
    const unsubscribe = onValue(tokenomicsRef, (snapshot) => {
      if (snapshot.exists()) {
        setTokenomics(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, []);

  if (!tokenomics) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No tokenomics data available</p>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Supply',
      value: tokenomics.totalSupply,
      icon: Coins,
    },
    {
      name: 'Circulating Supply',
      value: tokenomics.circulatingSupply,
      icon: ArrowUpDown,
    },
    {
      name: 'Burned',
      value: tokenomics.burned,
      icon: Flame,
    },
    {
      name: 'Holders',
      value: tokenomics.holders,
      icon: Users,
    },
  ];

  const taxes = [
    {
      name: 'Transfer Tax',
      value: tokenomics.transferTax,
    },
    {
      name: 'Liquidity Tax',
      value: tokenomics.liquidityTax,
    },
    {
      name: 'Marketing Tax',
      value: tokenomics.marketingTax,
    },
    {
      name: 'Development Tax',
      value: tokenomics.devTax,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Current Tokenomics</h2>

      <div className="space-y-8">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-50 rounded-full">
                  <stat.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Info */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Market Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="text-lg font-semibold">{tokenomics.marketCap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fully Diluted Market Cap</p>
              <p className="text-lg font-semibold">{tokenomics.fullyDilutedMarketCap}</p>
            </div>
          </div>
        </div>

        {/* Taxes */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Tax Structure</h3>
          <div className="grid grid-cols-2 gap-4">
            {taxes.map((tax) => (
              <div key={tax.name} className="flex items-center">
                <Percent className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">{tax.name}</p>
                  <p className="text-lg font-semibold">{tax.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price History */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Price History</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Initial Price</p>
              <p className="text-lg font-semibold">{tokenomics.initialPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">All Time High</p>
              <p className="text-lg font-semibold">{tokenomics.allTimeHigh}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">All Time Low</p>
              <p className="text-lg font-semibold">{tokenomics.allTimeLow}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Additional Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Contract Address</p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded mt-1">
                {tokenomics.contractAddress}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Launch Date</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-sm font-semibold">{tokenomics.launchDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Liquidity Locked Until</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-sm font-semibold">{tokenomics.liquidityLocked}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}