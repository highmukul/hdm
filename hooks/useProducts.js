import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, onSnapshot, limit as firestoreLimit } from 'firebase/firestore';
import { useStores } from './useStores'; // We will need this to get all stores

export const useProducts = (storeId, options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stores, loading: storesLoading } = useStores();

  useEffect(() => {
    let unsubscribes = [];
    setLoading(true);

    const fetchProducts = async () => {
      try {
        if (!storeId) {
          // --- The Immediate Fix ---
          // If no storeId is provided, we fetch products from all stores.
          // This is less efficient but requires no special index.
          if (storesLoading) return; // Wait for stores to be loaded

          let allProducts = [];
          for (const store of stores) {
            const productsCollection = collection(db, 'stores', store.id, 'products');
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({
              id: doc.id,
              storeId: store.id,
              ...doc.data()
            }));
            allProducts = [...allProducts, ...productsList];
          }
          setProducts(allProducts);
          setLoading(false);

        } else {
          // Fetch products from a single, specified store.
          const productsCollection = collection(db, 'stores', storeId, 'products');
          let productsQuery = query(productsCollection);
          if (options.limit) {
            productsQuery = query(productsQuery, firestoreLimit(options.limit));
          }
          const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
            const productsList = snapshot.docs.map(doc => ({
              id: doc.id,
              storeId: storeId,
              ...doc.data()
            }));
            setProducts(productsList);
            setLoading(false);
          }, (err) => {
            setError(err);
            console.error(`Error fetching products for store ${storeId}:`, err);
            setLoading(false);
          });
          unsubscribes.push(unsubscribe);
        }
      } catch (err) {
        setError(err);
        console.error("A critical error occurred while fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [storeId, options.limit, stores, storesLoading]);

  return { products, loading, error };
};
