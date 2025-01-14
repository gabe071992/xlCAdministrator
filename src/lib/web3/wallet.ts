import { BSC_CHAIN_ID, BSC_NETWORK_CONFIG } from './constants';

export const connectWallet = async () => {
  if (!window.ethereum?.isMetaMask) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    // Switch to BSC network if needed
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // Handle chain switch error
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_NETWORK_CONFIG]
        });
      } else {
        throw switchError;
      }
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};