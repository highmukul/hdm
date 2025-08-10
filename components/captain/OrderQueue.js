import React from 'react';
import OrderCard from './OrderCard';

const OrderQueue = ({ orders, loading, error }) => {
    if (loading) return <p>Loading available orders...</p>;
    if (error) return <p>Error loading orders. Please try again.</p>;
    if (orders.length === 0) return <p>No available orders at the moment.</p>;

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderQueue;
