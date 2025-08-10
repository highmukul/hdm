import useAdminStats from '../../hooks/useAdminStats';
import useAdminData from '../../hooks/useAdminData';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminStats from '../../components/admin/AdminStats';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import TopProducts from '../../components/admin/TopProducts';
import { motion } from 'framer-motion';
import Spinner from '../../components/ui/Spinner';
import dynamic from 'next/dynamic';
import UserDistributionChart from '../../components/admin/UserDistributionChart';

// Dynamically import SalesChart with SSR turned off
const SalesChart = dynamic(() => import('../../components/admin/SalesChart'), {
    ssr: false,
    loading: () => <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex justify-center items-center"><Spinner /></div>
});

const Dashboard = () => {
    const { stats, loading: statsLoading, error: statsError } = useAdminStats();
    const { data: users, loading: usersLoading, error: usersError } = useAdminData('users');

    if (statsLoading || usersLoading) {
        return <AdminLayout><div className="flex justify-center items-center h-full"><Spinner /></div></AdminLayout>;
    }

    if (statsError || usersError) {
        return <AdminLayout><div>Error: {statsError?.message || usersError?.message}</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <AdminStats stats={stats} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SalesChart salesData={stats.salesData} />
                    </div>
                    <div className="lg:col-span-1">
                        <UserDistributionChart users={users} />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <RecentOrdersTable orders={stats.recentOrders} />
                    </div>
                    <div>
                        <TopProducts />
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default Dashboard;
