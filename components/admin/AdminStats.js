import { useAdminStats } from '../../hooks/useAdminStats';
import { FaUsers, FaBoxOpen, FaClipboardList, FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, colorClass }) => {
    return (
        <motion.div
            className={`card p-6 border-l-4 ${colorClass}`}
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-text-secondary uppercase">{title}</p>
                    <p className="text-3xl font-bold text-text-primary">{value}</p>
                </div>
                <div className="text-4xl text-gray-300 dark:text-gray-600">{icon}</div>
            </div>
        </motion.div>
    );
};

export default function AdminStats() {
    const { stats, loading, error } = useAdminStats();

    if (loading) {
        // A more visually appealing skeleton loader
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card-background p-6 rounded-lg shadow-lg h-24 animate-pulse"></div>
                ))}
            </div>
        );
    }
    if (error) return <p className="text-red-500">Could not load statistics.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Sales" value={`₹${stats.totalSales?.toFixed(2) || '0.00'}`} icon={<FaRupeeSign />} colorClass="border-green-500" />
            <StatCard title="Total Orders" value={stats.orderCount || 0} icon={<FaClipboardList />} colorClass="border-indigo-500" />
            <StatCard title="Total Products" value={stats.productCount || 0} icon={<FaBoxOpen />} colorClass="border-yellow-500" />
            <StatCard title="Total Users" value={stats.userCount || 0} icon={<FaUsers />} colorClass="border-blue-500" />
        </div>
    );
}
