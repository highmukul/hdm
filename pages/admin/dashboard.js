import AdminLayout from '../../components/admin/AdminLayout';
import AdminStats from '../../components/admin/AdminStats';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiShoppingBag, FiBarChart2 } from 'react-icons/fi';

// Mock data for charts and recent activity
const recentActivities = [
  { type: 'order', description: 'New order #1234 by John Doe', time: '10m ago' },
  { type: 'user', description: 'New user registered: sarah@example.com', time: '1h ago' },
  { type: 'product', description: 'Product "Organic Bananas" is low on stock', time: '3h ago' },
];

const SalesChart = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-96 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
        <div className="flex-grow flex items-center justify-center">
            <FiBarChart2 className="text-gray-300 text-6xl" />
            <p className="text-gray-400 ml-4">Chart data not available.</p>
        </div>
    </div>
);

const RecentActivity = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-96 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
            {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                        {activity.type === 'order' && <FiShoppingBag className="text-blue-500" />}
                        {activity.type === 'user' && <FiUsers className="text-green-500" />}
                        {activity.type === 'product' && <FiDollarSign className="text-yellow-500" />}
                    </div>
                    <div>
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <AdminStats />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SalesChart />
                    </div>
                    <div>
                        <RecentActivity />
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
