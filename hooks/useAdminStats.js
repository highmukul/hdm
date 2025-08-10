import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const useAdminStats = () => {
    const { user } = useAuth(); // Get the current user
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        pendingCaptains: 0,
        recentOrders: [],
        salesData: [],
        topProducts: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            // Only fetch if the user is an admin
            if (!user?.isAdmin) {
                // We don't set an error here, as this can be a normal state (e.g., non-admin user).
                // The UI component should handle the case where stats are not available.
                setLoading(false);
                return;
            }

            try {
                const usersCollection = collection(db, 'users');
                const productsCollection = collection(db, 'products');
                const ordersCollection = collection(db, 'orders');
                const captainsCollection = collection(db, 'captains');

                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

                const usersQuery = getDocs(query(usersCollection, where('role', '==', 'customer')));
                const productsQuery = getDocs(productsCollection);
                const ordersQuery = getDocs(ordersCollection);
                const pendingCaptainsQuery = getDocs(query(captainsCollection, where('status', '==', 'pending')));
                const recentOrdersQuery = getDocs(query(ordersCollection, orderBy('createdAt', 'desc'), limit(5)));
                const salesQuery = getDocs(query(ordersCollection, where('createdAt', '>=', thirtyDaysAgoTimestamp)));
                const topProductsQuery = getDocs(query(productsCollection, orderBy('sales', 'desc'), limit(5)));

                const [
                    usersSnapshot, 
                    productsSnapshot, 
                    ordersSnapshot, 
                    pendingCaptainsSnapshot,
                    recentOrdersSnapshot, 
                    salesSnapshot, 
                    topProductsSnapshot
                ] = await Promise.all([
                    usersQuery,
                    productsQuery,
                    ordersQuery,
                    pendingCaptainsQuery,
                    recentOrdersQuery,
                    salesQuery,
                    topProductsQuery,
                ]);

                const totalUsers = usersSnapshot.size;
                const totalProducts = productsSnapshot.size;
                const totalOrders = ordersSnapshot.size;
                const pendingCaptains = pendingCaptainsSnapshot.size;

                const recentOrders = recentOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const salesData = salesSnapshot.docs.reduce((acc, doc) => {
                    const order = doc.data();
                    if (order.createdAt && typeof order.createdAt.toDate === 'function') {
                        const date = order.createdAt.toDate().toLocaleDateString('en-CA'); // YYYY-MM-DD
                        const existingEntry = acc.find(item => item.date === date);
                        if (existingEntry) {
                            existingEntry.total += order.total;
                        } else {
                            acc.push({ date, total: order.total });
                        }
                    }
                    return acc;
                }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

                const topProducts = topProductsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setStats({ totalUsers, totalProducts, totalOrders, pendingCaptains, recentOrders, salesData, topProducts });
            } catch (err) {
                setError(err);
                console.error("Error fetching admin stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]); // Rerun the effect if the user changes

    return { stats, loading, error };
};

export default useAdminStats;
