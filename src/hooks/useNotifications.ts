import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

interface Notification {
  id: string;
  type: 'transaction' | 'alert' | 'system';
  message: string;
  read: boolean;
  createdAt: string;
}

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const notificationsRef = ref(db, 'notifications');
    const unreadQuery = query(notificationsRef, orderByChild('read'), equalTo(false));

    const unsubscribe = onValue(unreadQuery, (snapshot) => {
      if (snapshot.exists()) {
        const notifs = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...(data as Omit<Notification, 'id'>)
        }));
        setNotifications(notifs);
      } else {
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return { notifications };
}