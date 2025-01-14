import { web3 } from './provider';
import { XLC_CONTRACT_ADDRESS } from './constants';
import { XLC_ABI } from './abi';
import toast from 'react-hot-toast';

// Initialize contract instance and verify connection
export const xlcContract = new web3.eth.Contract(XLC_ABI, XLC_CONTRACT_ADDRESS);

// Verify contract connection
export const verifyContractConnection = async () => {
  try {
    await xlcContract.methods.name().call();
    toast.success('Successfully connected to XLC contract');
    return true;
  } catch (error) {
    toast.error('Failed to connect to XLC contract');
    return false;
  }
};

// Call verification on init
verifyContractConnection();

export const getXLCBalance = async (address: string) => {
  try {
    const balance = await xlcContract.methods.balanceOf(address).call();
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('Error getting XLC balance:', error);
    return '0';
  }
};