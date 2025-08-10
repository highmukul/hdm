import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { FiArchive, FiChevronDown, FiChevronUp, FiShoppingBag } from 'react-icons/fi';
import EmptyState from '../common/EmptyState';
import { useRouter } from 'next/router';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
            const userOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(userOrders);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) return <div className="text-center py-16"><div className="loader"></div></div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map(order => (
                        <OrderHistoryCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<FiShoppingBag />}
                    title="You haven't placed any orders yet."
                    message="When you place an order, it will appear here. Let's get you started!"
                    actionText="Start Shopping"
                    onActionClick={() => router.push('/')}
                />
            )}
        </div>
    );
};

const OrderHistoryCard = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const createdAtDate = order.createdAt?.toDate();

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <p className="font-semibold text-gray-800">Order ID: #{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">
                        {createdAtDate ? createdAtDate.toLocaleDateString() : 'Date not available'}
                    </p>
                </div>
                <div className="flex items-center">
                    <span className={`text-sm font-medium mr-4 px-2.5 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{order.status}</span>
                    <span className="text-gray-500">
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="p-4">
                    <div className="mb-4">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <Image src={item.imageUrls?.[0] || '/placeholder.png'} alt={item.name} width={40} height={40} className="rounded" />
                                    <span className="ml-3 text-sm text-gray-700">{item.name} (x{item.quantity})</span>
                                </div>
                                <span className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-3 text-right">
                        <p className="font-semibold text-gray-800">Total: ₹{order.total.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
