import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useProducts = (storeId = null) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const productsCollection = collection(db, 'products');
        let productsQuery;

        if (storeId) {
            productsQuery = query(productsCollection, where('storeId', '==', storeId));
        } else {
            productsQuery = query(productsCollection);
        }

        const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(fetchedProducts);
            setLoading(false);
        }, (err) => {
            setError(err);
            console.error("Error fetching products:", err);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [storeId]);

    return { products, loading, error };
};
