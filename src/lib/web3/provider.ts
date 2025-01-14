import Web3 from 'web3';
import { BSC_RPC_URL } from './constants';

// Initialize Web3 with a fallback provider and retry mechanism
export const getWeb3Provider = () => {
  try {
    if (window.ethereum) {
      return window.ethereum;
    }
  } catch (error) {
    console.error('Error accessing window.ethereum:', error);
  }
  
  // Create provider with retry mechanism
  const provider = new Web3.providers.HttpProvider(BSC_RPC_URL, {
    timeout: 30000, // 30 seconds
    reconnect: {
      auto: true,
      delay: 5000, // 5 seconds
      maxAttempts: 5,
      onTimeout: false
    }
  });
  
  return provider;
};

// Create Web3 instance
export const web3 = new Web3(getWeb3Provider());

// Update provider when MetaMask account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => {
    web3.setProvider(getWeb3Provider());
  });
}