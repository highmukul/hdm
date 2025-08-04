import { useState, useEffect, useCallback } from 'react';
import { getDashboardStats } from '../api/admin'; // We will verify this API function exists

export const useAdminStats = () => {
    const [stats, setStats] = useState({ userCount: 0, productCount: 0, orderCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getDashboardStats();
            setStats(data);
        } catch (err) {
            setError(err);
            console.error("Failed to fetch admin stats:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
};