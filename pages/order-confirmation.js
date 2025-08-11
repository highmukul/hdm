import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Spinner from '../components/ui/Spinner';

const OrderConfirmationPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            const docRef = doc(db, 'orders', orderId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrder({ id: docSnap.id, ...docSnap.data() });
            }
            setLoading(false);
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <Layout><div className="flex justify-center items-center h-screen"><Spinner /></div></Layout>;
    }

    if (!order) {
        return <Layout><div className="text-center py-20">Order not found.</div></Layout>;
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">Thank You! Your Order is Confirmed.</h1>
                    <p className="text-lg">An email confirmation has been sent to your registered email address.</p>
                </div>

                <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Shipping Address:</h3>
                            <div className="text-gray-600">
                                <p className="font-bold">{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                <p>Mobile: {order.shippingAddress.mobile}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Order Details:</h3>
                            <div className="text-gray-600 space-y-2">
                                <p><strong>Order ID:</strong> {order.orderId}</p>
                                <p><strong>Total Amount:</strong> <span className="font-bold text-xl">₹{order.total.toFixed(2)}</span></p>
                                <p><strong>Payment Status:</strong> <span className="text-green-600 font-semibold">{order.status}</span></p>
                            </div>
                        </div>
                    </div>
                     <div className="mt-8">
                        <h3 className="font-semibold text-lg mb-2">Items Ordered:</h3>
                        <ul className="divide-y divide-gray-200">
                            {order.items.map(item => (
                                <li key={item.id} className="py-3 flex items-center justify-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                 </li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div className="mt-8 text-center">
                    <button onClick={() => router.push('/shop')} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Continue Shopping
                    </button>
                    <button onClick={() => router.push('/profile?section=orders')} className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                        View Order History
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default OrderConfirmationPage;
