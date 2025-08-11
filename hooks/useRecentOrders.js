import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const useRecentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const q = query(ordersCollection, orderBy('createdAt', 'desc'), limit(5));
                const querySnapshot = await getDocs(q);
                const recentOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(recentOrders);
            } catch (err) {
                setError(err);
                console.error("Error fetching recent orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentOrders();
    }, []);

    return { orders, loading, error };
};

export default useRecentOrders;
