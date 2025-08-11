import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, where, orderBy, limit } from 'firebase/firestore';

export const useProducts = ({ storeId, category, sortBy, search, isFeatured, pageSize = 20 }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        try {
            let productsQuery = collection(db, 'products');
            
            let queries = [];

            if (storeId) {
                queries.push(where('storeId', '==', storeId));
            }
            if (category) {
                queries.push(where('category', '==', category));
            }
            if (search) {
                // Firestore doesn't support full-text search natively.
                // A more robust solution would use a service like Algolia.
                // This is a basic prefix search.
                queries.push(where('name', '>=', search));
                queries.push(where('name', '<=', search + '\uf8ff'));
            }
            if(isFeatured) {
                queries.push(where('isFeatured', '==', true));
            }

            if (sortBy === 'price-asc') {
                queries.push(orderBy('price', 'asc'));
            } else if (sortBy === 'price-desc') {
                queries.push(orderBy('price', 'desc'));
            } else {
                queries.push(orderBy('createdAt', 'desc'));
            }
            
            if(pageSize) {
                queries.push(limit(pageSize));
            }

            const finalQuery = query(productsQuery, ...queries);

            const unsubscribe = onSnapshot(finalQuery, (snapshot) => {
                const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(fetchedProducts);
                setLoading(false);
            }, (err) => {
                console.error(err);
                setError('Failed to load products.');
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setLoading(false);
        }
    }, [storeId, category, sortBy, search, isFeatured, pageSize]);

    return { products, loading, error };
};
