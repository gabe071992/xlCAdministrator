import React, { useState } from 'react';
import { Metric, MetricCategory } from '../../types/ratesAndWeights';
import { saveMetric } from '../../lib/ratesAndWeights';
import toast from 'react-hot-toast';

const CATEGORIES: MetricCategory[] = [
  'User Activity',
  'Transactions',
  'Revenue',
  'Network',
  'Market'
];

interface MetricFormProps {
  onSave: () => void;
  initialMetric?: Metric;
}

export default function MetricForm({ onSave, initialMetric }: MetricFormProps) {
  const [metric, setMetric] = useState<Partial<Metric>>(initialMetric || {
    name: '',
    description: '',
    category: 'User Activity',
    minValue: 0,
    maxValue: 100
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!metric.name || !metric.description) {
        throw new Error('Please fill in all required fields');
      }

      const newMetric: Metric = {
        ...metric as Metric,
        id: initialMetric?.id || crypto.randomUUID()
      };

      await saveMetric(newMetric);
      toast.success('Metric saved successfully');
      onSave();
      if (!initialMetric) {
        setMetric({
          name: '',
          description: '',
          category: 'User Activity',
          minValue: 0,
          maxValue: 100
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save metric');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Metric Name
        </label>
        <input
          type="text"
          value={metric.name}
          onChange={(e) => setMetric({ ...metric, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={metric.description}
          onChange={(e) => setMetric({ ...metric, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={metric.category}
          onChange={(e) => setMetric({ ...metric, category: e.target.value as MetricCategory })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Value
          </label>
          <input
            type="number"
            value={metric.minValue}
            onChange={(e) => setMetric({ ...metric, minValue: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Value
          </label>
          <input
            type="number"
            value={metric.maxValue}
            onChange={(e) => setMetric({ ...metric, maxValue: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        {initialMetric ? 'Update Metric' : 'Add Metric'}
      </button>
    </form>
  );
}