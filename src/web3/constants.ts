export const BSC_CHAIN_ID = 56;
export const BSC_TESTNET_CHAIN_ID = 97;

export const BSC_CHAIN_CONFIG = {
  chainId: `0x${BSC_CHAIN_ID.toString(16)}`,
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};