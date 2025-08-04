import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { db } from '../../../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const CaptainOrderDetailPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!orderId) return;
        const unsubscribe = onSnapshot(doc(db, 'orders', orderId), (doc) => {
            setOrder({ id: doc.id, ...doc.data() });
        });
        return unsubscribe;
    }, [orderId]);

    const handleAcceptOrder = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'orders', orderId), {
                status: 'accepted',
                captainId: user.uid,
            });
            toast.success('Order accepted!');
            router.push('/captain/home');
        } catch (error) {
            toast.error('Failed to accept order.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeclineOrder = () => {
        // In a real app, this would trigger a reassignment function
        toast.info('Order declined.');
        router.push('/captain/home');
    };

    if (!order) return <Layout><p>Loading order details...</p></Layout>;

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                <div className="p-4 bg-white rounded-lg shadow">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Customer Address:</strong> {order.shippingAddress.fullAddress}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
                    <h3 className="text-lg font-semibold mt-4">Items:</h3>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={handleAcceptOrder}
                            disabled={loading || order.status !== 'pending'}
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Accepting...' : 'Accept Order'}
                        </button>
                        <button
                            onClick={handleDeclineOrder}
                            disabled={loading || order.status !== 'pending'}
                            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CaptainOrderDetailPage;
