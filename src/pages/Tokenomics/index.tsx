import React from 'react';
import TokenomicsForm from './components/TokenomicsForm';
import TokenomicsDisplay from './components/TokenomicsDisplay';

export default function Tokenomics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tokenomics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TokenomicsForm />
        <TokenomicsDisplay />
      </div>
    </div>
  );
}