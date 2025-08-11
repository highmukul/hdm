import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { sub } from 'date-fns';

const useDashboardStats = (dateRange) => {
    const [stats, setStats] = useState({
        totalRevenue: { value: 0, change: 0 },
        totalOrders: { value: 0, change: 0 },
        totalCustomers: { value: 0, change: 0 },
        totalProducts: { value: 0, change: 0 },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatsForPeriod = async (start, end) => {
        const usersQuery = query(collection(db, 'users'), where('createdAt', '>=', start), where('createdAt', '<=', end));
        const productsQuery = query(collection(db, 'products'), where('createdAt', '>=', start), where('createdAt', '<=', end));
        const ordersQuery = query(collection(db, 'orders'), where('createdAt', '>=', start), where('createdAt', '<=', end));

        const [usersSnapshot, productsSnapshot, ordersSnapshot] = await Promise.all([
            getDocs(usersQuery),
            getDocs(productsQuery),
            getDocs(ordersQuery),
        ]);

        const totalCustomers = usersSnapshot.size;
        const totalProducts = productsSnapshot.size;
        const totalOrders = ordersSnapshot.size;
        const totalRevenue = ordersSnapshot.docs.reduce((acc, doc) => acc + doc.data().total, 0);

        return { totalRevenue, totalOrders, totalCustomers, totalProducts };
    };

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError(null);

            try {
                const { startDate, endDate } = dateRange;

                // Fetch current period stats
                const currentStats = await fetchStatsForPeriod(startDate, endDate);

                // Fetch previous period stats for comparison
                const diff = endDate.getTime() - startDate.getTime();
                const prevStartDate = new Date(startDate.getTime() - diff);
                const prevEndDate = new Date(endDate.getTime() - diff);
                const previousStats = await fetchStatsForPeriod(prevStartDate, prevEndDate);

                // Calculate percentage change
                const calculateChange = (current, previous) => {
                    if (previous === 0) return current > 0 ? 100 : 0;
                    return ((current - previous) / previous) * 100;
                };
                
                setStats({
                    totalRevenue: {
                        value: currentStats.totalRevenue,
                        change: calculateChange(currentStats.totalRevenue, previousStats.totalRevenue),
                    },
                    totalOrders: {
                        value: currentStats.totalOrders,
                        change: calculateChange(currentStats.totalOrders, previousStats.totalOrders),
                    },
                    totalCustomers: {
                        value: currentStats.totalCustomers,
                        change: calculateChange(currentStats.totalCustomers, previousStats.totalCustomers),
                    },
                    totalProducts: {
                        value: currentStats.totalProducts,
                        change: calculateChange(currentStats.totalProducts, previousStats.totalProducts),
                    },
                });

            } catch (err) {
                setError(err);
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        };

        if (dateRange.startDate && dateRange.endDate) {
            fetchStats();
        }
    }, [dateRange]);

    return { stats, loading, error };
};

export default useDashboardStats;
