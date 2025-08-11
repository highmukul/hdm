import { useState } from 'react';
import useDashboardStats from '../../hooks/useDashboardStats';
import useRecentOrders from '../../hooks/useRecentOrders';
import useTopProducts from '../../hooks/useTopProducts';
import useSalesData from '../../hooks/useSalesData';
import AdminLayout from '../../components/admin/AdminLayout';
import Spinner from '../../components/ui/Spinner';
import dynamic from 'next/dynamic';
import { FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PendingCaptainsTable from '../../components/admin/PendingCaptainsTable';
import RecentUsersList from '../../components/admin/RecentUsersList';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import TopProducts from '../../components/admin/TopProducts';
import DateRangePicker from '../../components/common/DateRangePicker';
import { subDays } from 'date-fns';

// StatCard component with percentage change
const StatCard = ({ icon, title, value, change, loading, error }) => {
    const isPositive = change >= 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const ChangeIcon = isPositive ? FaArrowUp : FaArrowDown;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            {loading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
            {error && <div className="text-red-500">Error</div>}
            {!loading && !error && (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-2xl font-bold text-gray-800">{value}</p>
                        <div className={`text-sm flex items-center ${changeColor}`}>
                            <ChangeIcon className="mr-1" />
                            <span>{change.toFixed(2)}% vs previous period</span>
                        </div>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                        {icon}
                    </div>
                </div>
            )}
        </div>
    );
};

// Dynamic imports for charts
const SalesChart = dynamic(() => import('../../components/admin/SalesChart'), { ssr: false });

const AdminDashboard = () => {
    const [dateRange, setDateRange] = useState({
        startDate: subDays(new Date(), 30),
        endDate: new Date(),
    });

    const { stats, loading: statsLoading, error: statsError } = useDashboardStats(dateRange);
    const { orders, loading: ordersLoading, error: ordersError } = useRecentOrders(dateRange);
    const { products, loading: productsLoading, error: productsError } = useTopProducts(dateRange);
    const { salesData, loading: salesLoading, error: salesError } = useSalesData(dateRange);

    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        icon={<FaDollarSign className="text-indigo-500" />} 
                        title="Total Revenue" 
                        value={`₹${stats.totalRevenue.value?.toFixed(2) ?? '0.00'}`} 
                        change={stats.totalRevenue.change}
                        loading={statsLoading}
                        error={statsError}
                    />
                    <StatCard 
                        icon={<FaShoppingCart className="text-indigo-500" />} 
                        title="Total Orders" 
                        value={stats.totalOrders.value ?? 0}
                        change={stats.totalOrders.change}
                        loading={statsLoading}
                        error={statsError}
                    />
                    <StatCard 
                        icon={<FaUsers className="text-indigo-500" />} 
                        title="Total Customers" 
                        value={stats.totalCustomers.value ?? 0}
                        change={stats.totalCustomers.change}
                        loading={statsLoading}
                        error={statsError}
                    />
                    <StatCard 
                        icon={<FaBoxOpen className="text-indigo-500" />} 
                        title="Total Products" 
                        value={stats.totalProducts.value ?? 0}
                        change={stats.totalProducts.change}
                        loading={statsLoading}
                        error={statsError}
                    />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                        {ordersLoading && <Spinner />}
                        {ordersError && <div>Error loading orders.</div>}
                        {!ordersLoading && !ordersError && <RecentOrdersTable orders={orders} />}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
                        {productsLoading && <Spinner />}
                        {productsError && <div>Error loading products.</div>}
                        {!productsLoading && !productsError && <TopProducts products={products} />}
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
                    {salesLoading && <Spinner />}
                    {salesError && <div>Error loading sales data.</div>}
                    {!salesLoading && !salesError && <SalesChart salesData={salesData} />}
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
