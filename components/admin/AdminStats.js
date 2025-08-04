import { useAdminStats } from '../../hooks/useAdminStats';
import { FiDollarSign, FiShoppingBag, FiBox, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, iconBgColor }) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm flex items-center"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} mr-5`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </motion.div>
    );
};

const StatSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-5"></div>
        <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
);

export default function AdminStats() {
    const { stats, loading, error } = useAdminStats();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
            </div>
        );
    }
    if (error) return <p className="text-red-500 bg-red-100 p-4 rounded-lg">Error: Could not load statistics.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Total Revenue" 
                value={`₹${stats.totalSales?.toFixed(2) || '0.00'}`} 
                icon={<FiDollarSign className="text-green-600" />}
                iconBgColor="bg-green-100"
            />
            <StatCard 
                title="Total Orders" 
                value={stats.orderCount || 0} 
                icon={<FiShoppingBag className="text-blue-600" />}
                iconBgColor="bg-blue-100"
            />
            <StatCard 
                title="Active Products" 
                value={stats.productCount || 0} 
                icon={<FiBox className="text-yellow-600" />}
                iconBgColor="bg-yellow-100"
            />
            <StatCard 
                title="Registered Users" 
                value={stats.userCount || 0} 
                icon={<FiUsers className="text-indigo-600" />}
                iconBgColor="bg-indigo-100"
            />
        </div>
    );
}
