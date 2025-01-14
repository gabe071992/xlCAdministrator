import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: number;
}

export default function StatCard({ title, value, icon: Icon, change }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-full">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      {typeof change !== 'undefined' && (
        <div className="mt-4">
          <span className={`text-sm ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500"> from last month</span>
        </div>
      )}
    </div>
  );
}