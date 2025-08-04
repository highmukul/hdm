import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { OrderHistoryItem } from '../common/components'; // CORRECTED IMPORT

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'orders'), 
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userOrders = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : 'N/A',
                };
            });
            setOrders(userOrders);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <p className="text-text-secondary">Loading your order history...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">My Order History</h2>
            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map(order => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 card">
                    <p className="text-text-secondary">You have&apos;t placed any orders yet.</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
