import { web3 } from './provider';
import { xlcContract } from './contract';
import type { Transaction } from '../../pages/Transactions/types';
import toast from 'react-hot-toast';

const CACHE_DURATION = 30 * 1000; // 30 seconds cache

let transactionCache = {
  transactions: [] as Transaction[],
  timestamp: 0
};

export const getTransactions = async (limit = 3): Promise<Transaction[]> => {
  if (Date.now() - transactionCache.timestamp < CACHE_DURATION) {
    return transactionCache.transactions.slice(0, limit);
  }

  try {
    const latestBlock = Number(await web3.eth.getBlockNumber());
    const fromBlock = Math.max(0, latestBlock - 5);

    const events = await xlcContract.getPastEvents('Transfer', {
      fromBlock: fromBlock.toString(),
      toBlock: latestBlock.toString()
    });

    const txs = await Promise.all(
      events.map(async (event) => {
        try {
          const block = await web3.eth.getBlock(event.blockNumber);
          const value = web3.utils.toBN(event.returnValues.value.toString());
          
          return {
            hash: event.transactionHash,
            from: event.returnValues.from,
            to: event.returnValues.to,
            amount: web3.utils.fromWei(value, 'ether'),
            timestamp: Number(block.timestamp) * 1000,
            blockNumber: Number(event.blockNumber)
          };
        } catch (error) {
          console.warn('Error processing transaction:', error);
          return null;
        }
      })
    );

    const validTransactions = txs.filter((tx): tx is Transaction => tx !== null);
    const sortedTransactions = validTransactions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    transactionCache = {
      transactions: sortedTransactions,
      timestamp: Date.now()
    };

    return sortedTransactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};