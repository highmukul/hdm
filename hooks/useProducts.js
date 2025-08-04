import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, limit as firestoreLimit } from 'firebase/firestore';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        let productsQuery = query(productsCollection);

        if (options.limit) {
            productsQuery = query(productsCollection, firestoreLimit(options.limit));
        }

        const productSnapshot = await getDocs(productsQuery);
        const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.limit]);

  return { products, loading, error };
};