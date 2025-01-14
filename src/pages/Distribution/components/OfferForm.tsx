import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Offer } from '../types';

interface OfferFormProps {
  onSave: (offer: Offer) => void;
  onCancel: () => void;
  initialData?: Offer;
}

export default function OfferForm({ onSave, onCancel, initialData }: OfferFormProps) {
  const [offer, setOffer] = useState<Offer>(initialData || {
    title: '',
    description: '',
    rewardAmount: '',
    duration: '',
    maxParticipants: '',
    requirements: [],
    active: true,
    startDate: '',
    endDate: '',
    type: 'standard',
  });

  const [newRequirement, setNewRequirement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(offer);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setOffer(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setOffer(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {initialData ? 'Edit Offer' : 'Create New Offer'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={offer.title}
              onChange={(e) => setOffer({ ...offer, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={offer.type}
              onChange={(e) => setOffer({ ...offer, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="exclusive">Exclusive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={offer.description}
              onChange={(e) => setOffer({ ...offer, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reward Amount (XLC)
            </label>
            <input
              type="number"
              value={offer.rewardAmount}
              onChange={(e) => setOffer({ ...offer, rewardAmount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (days)
            </label>
            <input
              type="number"
              value={offer.duration}
              onChange={(e) => setOffer({ ...offer, duration: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Participants
            </label>
            <input
              type="number"
              value={offer.maxParticipants}
              onChange={(e) => setOffer({ ...offer, maxParticipants: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={offer.active.toString()}
              onChange={(e) => setOffer({ ...offer, active: e.target.value === 'true' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={offer.startDate}
              onChange={(e) => setOffer({ ...offer, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={offer.endDate}
              onChange={(e) => setOffer({ ...offer, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Requirements
            </label>
            <div className="mt-1 flex space-x-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add a requirement"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            {offer.requirements && offer.requirements.length > 0 && (
              <div className="mt-2 space-y-2">
                {offer.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{req}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {initialData ? 'Update Offer' : 'Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
}