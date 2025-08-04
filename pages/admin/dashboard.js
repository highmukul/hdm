import AdminLayout from '../../components/admin/AdminLayout';
import AdminStats from '../../components/admin/AdminStats';
import { motion } from 'framer-motion';

const SalesChartPlaceholder = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg h-80 flex items-center justify-center">
        <p className="text-gray-500">Sales chart will be displayed here.</p>
    </div>
);

export default function Dashboard() {
    return (
        <AdminLayout>
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="space-y-10"
            >
                <AdminStats />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <SalesChartPlaceholder />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                         <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                         {/* Placeholder for recent orders or user signups */}
                         <p className="text-gray-500">Activity feed coming soon.</p>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
