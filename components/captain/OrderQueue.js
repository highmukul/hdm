import { useAvailableOrders } from '../../hooks/useAvailableOrders';
import { OrderCard } from './OrderCard';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

const OrderQueue = () => {
    const { orders, loading, error, refreshOrders } = useAvailableOrders();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Available Orders</h2>
                <button 
                    onClick={refreshOrders} 
                    disabled={loading}
                    className="flex items-center text-sm text-blue-600 font-semibold disabled:opacity-50"
                >
                    <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {loading && !orders.length ? (
                // Skeleton Loader
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-10 bg-red-50 text-red-700 rounded-lg">
                    <FiAlertCircle className="mx-auto text-4xl mb-2" />
                    <p>Error fetching orders. Please try again.</p>
                </div>
            ) : orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">No Orders Available</h3>
                    <p className="text-gray-500 mt-1">We'll notify you when new orders come in.</p>
                </div>
            )}
        </div>
    );
};

export default OrderQueue;
