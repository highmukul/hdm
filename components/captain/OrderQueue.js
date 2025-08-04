import { useAvailableOrders } from '../../hooks/useAvailableOrders';
import OrderCard from './OrderCard';

const OrderQueue = () => {
    const { orders, loading, error } = useAvailableOrders();
    
    // This would be managed in the captain's state
    const activeDelivery = null; 

    if (loading) return <p>Searching for available orders...</p>;
    if (error) return <p className="text-red-500">Could not fetch orders.</p>;

    return (
        <div>
            {/* Active Delivery */}
            {activeDelivery && (
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Active Delivery</h2>
                    <OrderCard order={activeDelivery} isActive={true} />
                </div>
            )}
            
            {/* Available Orders */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Available for Pickup</h2>
                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">No available orders right now. We&apos;ll notify you when one comes in!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderQueue;