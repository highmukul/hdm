import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export const useCompletedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'orders'), where('captainId', '==', user.uid), where('status', '==', 'delivered'));
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
        }
    }, [user]);

    return { orders, loading, error };
};
