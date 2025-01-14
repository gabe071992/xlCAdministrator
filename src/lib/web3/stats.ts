import { web3 } from './provider';
import { xlcContract } from './contract';

export const getTokenHolderCount = async (): Promise<number> => {
  try {
    const latestBlock = Number(await web3.eth.getBlockNumber());
    const fromBlock = Math.max(0, latestBlock - 100000); // Look back ~100k blocks
    
    const events = await xlcContract.getPastEvents('Transfer', {
      fromBlock: fromBlock.toString(),
      toBlock: latestBlock.toString()
    });

    const holders = new Set<string>();
    
    for (const event of events) {
      const { to, value } = event.returnValues;
      // Convert value to string before using toBN
      const amount = web3.utils.toBN(value.toString());
      
      if (!amount.isZero()) {
        holders.add(to);
      }
    }

    return holders.size;
  } catch (error) {
    console.error('Error fetching holder count:', error);
    return 0;
  }
};