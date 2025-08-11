import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Spinner from '../ui/Spinner';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        };

        const fetchOrders = async () => {
            const q = query(
                collection(db, 'orders'), 
                where('userId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(userOrders);
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return <Spinner />;
    }

    if (orders.length === 0) {
        return <p>You have no past orders.</p>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Orders</h2>
            {orders.map(order => (
                <div key={order.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-semibold text-lg">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-500">
                                Ordered on: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Status: <span className="font-semibold text-green-500">{order.status}</span>
                            </p>
                        </div>
                        <span className="font-bold text-xl">₹{order.total.toFixed(2)}</span>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                           {order.items.map(item => (
                               <li key={item.id} className="py-2 flex justify-between">
                                   <span>{item.name} (x{item.quantity})</span>
                                   <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
