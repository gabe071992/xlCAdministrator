import { db } from '../lib/firebase';
import { ref, get, query, orderByChild, startAt, endAt } from 'firebase/database';
import { xlcContract } from '../lib/web3';
import type { UserStats } from '../types/user';

export async function fetchUserStats(): Promise<UserStats> {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  
  const recentUsersQuery = query(
    usersRef,
    orderByChild('createdAt'),
    startAt(thirtyDaysAgo.getTime())
  );
  
  const recentSnapshot = await get(recentUsersQuery);
  
  const totalUsers = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
  const newUsers = recentSnapshot.exists() ? Object.keys(recentSnapshot.val()).length : 0;
  
  // Calculate active users (users with transactions in last 30 days)
  const txRef = ref(db, 'transactions');
  const recentTxQuery = query(
    txRef,
    orderByChild('timestamp'),
    startAt(thirtyDaysAgo.getTime())
  );
  
  const txSnapshot = await get(recentTxQuery);
  const activeUserSet = new Set<string>();
  
  if (txSnapshot.exists()) {
    Object.values(txSnapshot.val()).forEach((tx: any) => {
      activeUserSet.add(tx.fromAddress);
      if (tx.toAddress) activeUserSet.add(tx.toAddress);
    });
  }
  
  return {
    totalUsers,
    activeUsers: activeUserSet.size,
    newUsers,
    change: totalUsers > 0 ? (newUsers / totalUsers) * 100 : 0
  };
}