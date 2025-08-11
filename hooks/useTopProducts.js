import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const useTopProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const q = query(productsCollection, orderBy('sales', 'desc'), limit(5));
                const querySnapshot = await getDocs(q);
                const topProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(topProducts);
            } catch (err) {
                setError(err);
                console.error("Error fetching top products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, []);

    return { products, loading, error };
};

export default useTopProducts;
