import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const useDashboardStats = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const productsCollection = collection(db, 'products');
                const ordersCollection = collection(db, 'orders');

                const [usersSnapshot, productsSnapshot, ordersSnapshot] = await Promise.all([
                    getDocs(usersCollection),
                    getDocs(productsCollection),
                    getDocs(ordersCollection),
                ]);

                const totalCustomers = usersSnapshot.size;
                const totalProducts = productsSnapshot.size;
                const totalOrders = ordersSnapshot.size;

                const totalRevenue = ordersSnapshot.docs.reduce((acc, doc) => acc + doc.data().total, 0);

                setStats({ totalRevenue, totalOrders, totalCustomers, totalProducts });
            } catch (err) {
                setError(err);
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};

export default useDashboardStats;
