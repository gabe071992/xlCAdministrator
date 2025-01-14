import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BSC_CHAIN_ID, BSC_CHAIN_CONFIG } from './constants';
import type { WalletState, Web3Error } from './types';

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchAccount: (account: string) => Promise<void>;
  addAccount: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialState: WalletState = {
  address: null,
  accounts: [],
  chainId: null,
  isConnecting: false,
  error: null,
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>(initialState);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setState(prev => ({
        ...prev,
        error: new Error('MetaMask is not installed')
      }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) !== BSC_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BSC_CHAIN_CONFIG.chainId }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [BSC_CHAIN_CONFIG],
            });
          } else {
            throw switchError;
          }
        }
      }

      setState(prev => ({
        ...prev,
        address: accounts[0],
        accounts: accounts,
        chainId: parseInt(chainId, 16),
        isConnecting: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error as Web3Error,
        isConnecting: false,
      }));
    }
  }, []);

  const switchAccount = useCallback(async (account: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      
      setState(prev => ({
        ...prev,
        address: accounts[0],
        accounts: accounts
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error as Web3Error,
      }));
    }
  }, []);

  const addAccount = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      
      setState(prev => ({
        ...prev,
        address: accounts[0],
        accounts: accounts
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error as Web3Error,
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setState(initialState);
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setState(prev => ({
          ...prev,
          address: accounts[0] || null,
          accounts: accounts,
        }));
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId: parseInt(chainId, 16),
        }));
      });

      window.ethereum.on('disconnect', () => {
        setState(initialState);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{
      ...state,
      connectWallet,
      disconnectWallet,
      switchAccount,
      addAccount,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}