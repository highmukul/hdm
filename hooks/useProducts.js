import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, limit as firestoreLimit, onSnapshot } from 'firebase/firestore';

export const useProducts = (storeId, options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Do not run the query if the storeId is not yet available.
    if (!storeId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const productsCollection = collection(db, 'stores', storeId, 'products');
      let productsQuery = query(productsCollection);

      if (options.limit) {
          productsQuery = query(productsQuery, firestoreLimit(options.limit));
      }

      const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setLoading(false);
      }, (err) => {
        setError(err);
        console.error("Error fetching products:", err);
        setLoading(false);
      });

      return () => unsubscribe();

    } catch (err) {
      setError(err);
      console.error("Caught error:", err);
      setLoading(false);
    }
  }, [storeId, options.limit]);

  return { products, loading, error };
};
