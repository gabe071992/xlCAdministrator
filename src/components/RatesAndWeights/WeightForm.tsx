import React, { useState } from 'react';
import { Weight, Metric } from '../../types/ratesAndWeights';
import { saveWeight } from '../../lib/ratesAndWeights';
import toast from 'react-hot-toast';

interface WeightFormProps {
  metrics: Record<string, Metric>;
  weights: Record<string, Weight>;
  onSave: () => void;
  initialWeight?: Weight;
}

export default function WeightForm({ metrics, weights, onSave, initialWeight }: WeightFormProps) {
  const [weight, setWeight] = useState<Partial<Weight>>(initialWeight || {
    metricId: '',
    value: 0
  });

  // Calculate total of existing weights excluding current metric
  const getCurrentTotal = () => {
    return Object.entries(weights)
      .reduce((sum, [id, w]) => sum + (id !== weight.metricId ? w.value : 0), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!weight.metricId) {
        throw new Error('Please select a metric');
      }

      const currentTotal = getCurrentTotal();
      const newTotal = currentTotal + (weight.value || 0);

      if (newTotal > 100) {
        throw new Error(`Total weights cannot exceed 100%. Current total: ${currentTotal}%`);
      }

      await saveWeight(weight as Weight);
      toast.success('Weight saved successfully');
      onSave();
      if (!initialWeight) {
        setWeight({
          metricId: '',
          value: 0
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save weight');
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Weights Display */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Weights</h4>
        <div className="space-y-2">
          {Object.entries(weights).map(([id, w]) => (
            <div key={id} className="flex justify-between text-sm">
              <span>{metrics[id]?.name || 'Unknown Metric'}</span>
              <span className="font-medium">{w.value}%</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{getCurrentTotal()}%</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Remaining</span>
              <span>{100 - getCurrentTotal()}%</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Metric
          </label>
          <select
            value={weight.metricId}
            onChange={(e) => setWeight({ ...weight, metricId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a metric</option>
            {Object.entries(metrics).map(([id, metric]) => (
              <option key={id} value={id}>
                {metric.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight (%) - Maximum Available: {100 - getCurrentTotal()}%
          </label>
          <input
            type="number"
            min="0"
            max={100 - getCurrentTotal() + (weights[weight.metricId!]?.value || 0)}
            step="0.1"
            value={weight.value}
            onChange={(e) => setWeight({ ...weight, value: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {initialWeight ? 'Update Weight' : 'Add Weight'}
        </button>
      </form>
    </div>
  );
}