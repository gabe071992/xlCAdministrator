import React from 'react';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';
import SearchBar from './SearchBar';
import WalletConnect from '../WalletConnect';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <SearchBar />
        <div className="flex items-center space-x-4">
          <WalletConnect />
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}