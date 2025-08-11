import useDashboardStats from '../../hooks/useDashboardStats';
import useRecentOrders from '../../hooks/useRecentOrders';
import useTopProducts from '../../hooks/useTopProducts';
import useSalesData from '../../hooks/useSalesData';
import AdminLayout from '../../components/admin/AdminLayout';
import Spinner from '../../components/ui/Spinner';
import dynamic from 'next/dynamic';
import { FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import PendingCaptainsTable from '../../components/admin/PendingCaptainsTable';
import RecentUsersList from '../../components/admin/RecentUsersList';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import TopProducts from '../../components/admin/TopProducts';

// Card component for displaying stats
const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
            {icon}
        </div>
    </div>
);

// Dynamic imports for charts
const SalesChart = dynamic(() => import('../../components/admin/SalesChart'), { ssr: false });

const AdminDashboard = () => {
    const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
    const { orders, loading: ordersLoading, error: ordersError } = useRecentOrders();
    const { products, loading: productsLoading, error: productsError } = useTopProducts();
    const { salesData, loading: salesLoading, error: salesError } = useSalesData();

    if (statsLoading || ordersLoading || productsLoading || salesLoading) {
        return <AdminLayout><div className="flex justify-center items-center h-screen"><Spinner /></div></AdminLayout>;
    }

    if (statsError || ordersError || productsError || salesError) {
        return <AdminLayout><div>Error loading dashboard data.</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<FaDollarSign className="text-indigo-500" />} title="Total Revenue" value={`₹${stats.totalRevenue?.toFixed(2) ?? '0.00'}`} />
                    <StatCard icon={<FaShoppingCart className="text-indigo-500" />} title="Total Orders" value={stats.totalOrders ?? 0} />
                    <StatCard icon={<FaUsers className="text-indigo-500" />} title="Total Customers" value={stats.totalCustomers ?? 0} />
                    <StatCard icon={<FaBoxOpen className="text-indigo-500" />} title="Total Products" value={stats.totalProducts ?? 0} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                        <RecentOrdersTable orders={orders} />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
                        <TopProducts products={products} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Pending Captain Approvals</h2>
                        <PendingCaptainsTable />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent User Signups</h2>
                        <RecentUsersList />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                    <SalesChart salesData={salesData} />
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
