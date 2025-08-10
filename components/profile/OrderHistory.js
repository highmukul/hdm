import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            });
            return unsubscribe;
        }
    }, [user]);

    if (loading) return <p>Loading order history...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Order #{order.id.substring(0, 6)}...</h3>
                            <p className="font-bold">₹{order.total.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm">Status: {order.status}</p>
                            <Link href={`/track-order/${order.id}`} legacyBehavior>
                                <a className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Track Order</a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
