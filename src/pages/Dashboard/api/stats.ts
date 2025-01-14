import { db } from '../../../lib/firebase';
import { ref, get, query, orderByChild, startAt, endAt } from 'firebase/database';
import { formatNumber } from '../../../utils/format';

export async function fetchActiveUsers() {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
  
  return {
    count,
    change: 5.2 // This should be calculated based on historical data
  };
}

export async function fetchDailyTransactions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const transactionsRef = ref(db, 'transactions');
  const dailyQuery = query(
    transactionsRef,
    orderByChild('timestamp'),
    startAt(today.getTime()),
    endAt(Date.now())
  );
  
  const snapshot = await get(dailyQuery);
  const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
  
  return {
    count,
    change: -1.5 // This should be calculated based on historical data
  };
}