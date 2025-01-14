import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  Coins,
  Settings,
  Gift,
  Server,
  FileCode
} from 'lucide-react';
import { xlcContract } from '../lib/web3/contract';
import toast from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Transactions', icon: History, href: '/transactions' },
  { name: 'Token Operations', icon: Coins, href: '/token-operations' },
  { name: 'API Management', icon: Server, href: '/api-management' },
  { name: 'Distribution', icon: Gift, href: '/distribution' },
  { name: 'Deploy', icon: FileCode, href: '/deploy' },
  { name: 'Tokenomics', icon: Coins, href: '/tokenomics' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const [contractOwner, setContractOwner] = useState<string>('');

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const owner = await xlcContract.methods.owner().call();
        setContractOwner(owner);
      } catch (error) {
        console.error('Error fetching contract owner:', error);
        toast.error('Failed to fetch contract owner');
      }
    };
    fetchOwner();
  }, []);

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">XLC Admin</h1>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      {contractOwner && (
        <div className="absolute bottom-4 left-4 right-4 p-4 text-xs text-gray-500 border-t">
          <p className="font-medium">Contract Owner:</p>
          <p className="mt-1 break-all">{contractOwner}</p>
        </div>
      )}
    </div>
  );
}