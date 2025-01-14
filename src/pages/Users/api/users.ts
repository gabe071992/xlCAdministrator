import { User, UserFilters } from '../types';
import { db, auth } from '../../../lib/firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';

export async function fetchUsers(filters: UserFilters): Promise<User[]> {
  try {
    // Wait for auth to be initialized
    if (!auth.currentUser) {
      console.error('User not authenticated');
      return [];
    }

    const usersRef = ref(db, 'users');
    let users: User[] = [];

    if (filters.status) {
      const statusQuery = query(usersRef, orderByChild('status'), equalTo(filters.status));
      const snapshot = await get(statusQuery);
      if (snapshot.exists()) {
        users = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...(data as Omit<User, 'id'>)
        }));
      }
    } else {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        users = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...(data as Omit<User, 'id'>)
        }));
      }
    }

    if (filters.search) {
      return users.filter(user => 
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.walletAddress.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}