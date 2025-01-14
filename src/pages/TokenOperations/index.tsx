import React, { useState, useEffect } from 'react';
import { useWallet } from '../../web3/WalletContext';
import { ref, set, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { fetchRatesAndWeights, calculateDailyRate } from '../../lib/ratesAndWeights';
import type { RatesAndWeightsState } from '../../types/ratesAndWeights';
import MetricForm from '../../components/RatesAndWeights/MetricForm';
import WeightForm from '../../components/RatesAndWeights/WeightForm';
import toast from 'react-hot-toast';

type TabType = 'token' | 'rates';

export default function TokenOperations() {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState<TabType>('token');
  const [price, setPrice] = useState('');
  const [baselineRate, setBaselineRate] = useState(0);
  const [initialRate, setInitialRate] = useState('0');
  const [initialWeight, setInitialWeight] = useState('0');
  const [ratesAndWeights, setRatesAndWeights] = useState<RatesAndWeightsState>({
    metrics: {},
    weights: {},
    baselineRate: 0
  });

  useEffect(() => {
    const loadRatesAndWeights = async () => {
      try {
        const data = await fetchRatesAndWeights();
        setRatesAndWeights(data);
        setBaselineRate(data.baselineRate);
      } catch (error) {
        console.error('Error loading rates and weights:', error);
        toast.error('Failed to load rates and weights');
      }
    };

    loadRatesAndWeights();
  }, []);

  const handleInitialSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await set(ref(db, 'ratesAndWeights'), {
        metrics: {
          initial: {
            id: 'initial',
            name: 'Initial Metric',
            description: 'Initial system metric',
            category: 'Market',
            minValue: 0,
            maxValue: 100,
            currentValue: parseFloat(initialRate)
          }
        },
        weights: {
          initial: {
            metricId: 'initial',
            value: parseFloat(initialWeight)
          }
        },
        baselineRate: 0
      });
      toast.success('Initial rates and weights set successfully');
      const data = await fetchRatesAndWeights();
      setRatesAndWeights(data);
    } catch (error) {
      toast.error('Failed to set initial rates and weights');
      console.error('Error setting initial rates and weights:', error);
    }
  };

  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await set(ref(db, 'xlc'), {
        price: parseFloat(price)
      });
      toast.success('Price updated successfully');
      setPrice('');
    } catch (error) {
      toast.error('Failed to update price');
      console.error('Error updating price:', error);
    }
  };

  const handleBaselineRateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await set(ref(db, 'ratesAndWeights/baselineRate'), baselineRate);
      toast.success('Baseline rate updated successfully');
      setRatesAndWeights(prev => ({ ...prev, baselineRate }));
    } catch (error) {
      toast.error('Failed to update baseline rate');
      console.error('Error updating baseline rate:', error);
    }
  };

  const refreshRatesAndWeights = async () => {
    const data = await fetchRatesAndWeights();
    setRatesAndWeights(data);
  };

  const calculatedRate = calculateDailyRate(
    ratesAndWeights.metrics,
    ratesAndWeights.weights,
    ratesAndWeights.baselineRate
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('token')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'token'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Token Operations
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rates & Weights
          </button>
        </nav>
      </div>

      {activeTab === 'token' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Token Operations Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Set Token Price</h2>
            <form onSubmit={handlePriceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter price"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Update Price
              </button>
            </form>
          </div>

          {/* Transfer */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Transfer Tokens</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (XLC)</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Transfer</button>
            </form>
          </div>

          {/* Approve */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Approve Spender</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Spender Address</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (XLC)</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Approve</button>
            </form>
          </div>

          {/* Transfer From */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Transfer From</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From Address</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To Address</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (XLC)</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Transfer</button>
            </form>
          </div>

          {/* Owner Operations */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-lg font-medium mb-4">Owner Operations</h2>
            <div className="space-y-4">
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Renounce Ownership</button>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Owner Address</label>
                <div className="mt-1 flex space-x-2">
                  <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Transfer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Setup Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">Initial Rates and Weights Setup</h2>
              <form onSubmit={handleInitialSetup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Initial Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    value={initialRate}
                    onChange={(e) => setInitialRate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter initial rate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Initial Weight (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={initialWeight}
                    onChange={(e) => setInitialWeight(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter initial weight"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Initialize System
                </button>
              </form>
            </div>

            {/* Baseline Rate Setting */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">Set Baseline Rate</h2>
              <form onSubmit={handleBaselineRateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Baseline Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    value={baselineRate}
                    onChange={(e) => setBaselineRate(parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter baseline rate"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update Baseline Rate
                </button>
              </form>
            </div>
          </div>

          {/* Rates and Weights Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Rates and Weights Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-3">Add New Metric</h3>
                <MetricForm onSave={refreshRatesAndWeights} />
              </div>

              <div>
                <h3 className="text-md font-medium mb-3">Manage Weights</h3>
                <WeightForm
                  metrics={ratesAndWeights.metrics}
                  weights={ratesAndWeights.weights}
                  onSave={refreshRatesAndWeights}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-md font-medium mb-2">Current Daily Rate</h3>
              <p className="text-2xl font-bold text-indigo-600">
                {calculatedRate.toFixed(4)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Based on baseline rate and weighted metrics
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}