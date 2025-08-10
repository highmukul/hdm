import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useAvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(list);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return { orders, loading, error };
};
