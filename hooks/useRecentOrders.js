import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const useRecentOrders = (dateRange) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            if (!dateRange.startDate || !dateRange.endDate) return;

            setLoading(true);
            setError(null);
            
            try {
                const ordersCollection = collection(db, 'orders');
                const q = query(
                    ordersCollection, 
                    where('createdAt', '>=', dateRange.startDate), 
                    where('createdAt', '<=', dateRange.endDate), 
                    orderBy('createdAt', 'desc'), 
                    limit(5)
                );
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
    }, [dateRange]);

    return { orders, loading, error };
};

export default useRecentOrders;
