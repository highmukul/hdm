import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const useStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const storesCollection = collection(db, 'stores');
    const unsubscribe = onSnapshot(storesCollection, (snapshot) => {
      const storesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(storesList);
      setLoading(false);
    }, (err) => {
      setError(err);
      console.error("Error fetching stores:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { stores, loading, error };
};
