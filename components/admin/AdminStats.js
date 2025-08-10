import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

const StatCard = ({ icon, title, value, growth, color, link }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-lg shadow-lg bg-white flex flex-col justify-between`}
    >
        <div className="flex items-center">
            <div className={`p-3 rounded-full bg-${color}-100`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <p className={`text-sm font-medium ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {growth > 0 ? `+${growth}%` : `${growth}%`}
            </p>
            <Link href={link} legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:underline">View All</a>
            </Link>
        </div>
    </motion.div>
);

const AdminStats = ({ stats }) => {
    const { totalUsers, totalProducts, totalOrders, pendingCaptains } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                icon={<FaIcons.FaUsers size={24} className="text-blue-500" />}
                title="Total Users"
                value={totalUsers}
                growth={5.4}
                color="blue"
                link="/admin/users"
            />
            <StatCard
                icon={<FaIcons.FaBoxOpen size={24} className="text-green-500" />}
                title="Total Products"
                value={totalProducts}
                growth={2.1}
                color="green"
                link="/admin/products"
            />
            <StatCard
                icon={<FaIcons.FaShoppingCart size={24} className="text-yellow-500" />}
                title="Total Orders"
                value={totalOrders}
                growth={-1.8}
                color="yellow"
                link="/admin/orders"
            />
            <StatCard
                icon={<FaIcons.FaUserTie size={24} className="text-red-500" />}
                title="Pending Captains"
                value={pendingCaptains}
                growth={0}
                color="red"
                link="/admin/captains"
            />
        </div>
    );
};

export default AdminStats;
