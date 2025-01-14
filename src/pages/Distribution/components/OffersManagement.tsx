import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { db } from '../../../lib/firebase';
import { Offer } from '../types';
import OfferForm from './OfferForm';
import toast from 'react-hot-toast';

export default function OffersManagement() {
  const [offers, setOffers] = useState<Record<string, Offer>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<{ id: string; offer: Offer } | null>(null);

  useEffect(() => {
    const offersRef = ref(db, 'offers');
    const unsubscribe = onValue(offersRef, (snapshot) => {
      if (snapshot.exists()) {
        setOffers(snapshot.val());
      } else {
        setOffers({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (offerData: Offer) => {
    try {
      if (selectedOffer) {
        await update(ref(db, `offers/${selectedOffer.id}`), offerData);
        toast.success('Offer updated successfully');
      } else {
        await push(ref(db, 'offers'), offerData);
        toast.success('Offer created successfully');
      }
      setIsEditing(false);
      setSelectedOffer(null);
    } catch (error) {
      console.error('Error saving offer:', error);
      toast.error('Failed to save offer');
    }
  };

  const handleDelete = async (offerId: string) => {
    try {
      await remove(ref(db, `offers/${offerId}`));
      toast.success('Offer deleted successfully');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    }
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <OfferForm
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setSelectedOffer(null);
          }}
          initialData={selectedOffer?.offer}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Offer
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
              {Object.entries(offers).map(([id, offer]) => (
                <div
                  key={id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{offer.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOffer({ id, offer });
                          setIsEditing(true);
                        }}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">{offer.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Reward Amount:</span>
                      <span className="font-medium">{offer.rewardAmount} XLC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{offer.duration} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Participants:</span>
                      <span className="font-medium">{offer.maxParticipants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`font-medium ${
                        offer.active ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {offer.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {offer.requirements && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-500 list-disc list-inside">
                        {offer.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}