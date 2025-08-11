import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import AdminLayout from '../../../components/admin/AdminLayout';
import Spinner from '../../../components/ui/Spinner';

const OrderDetailsPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            const fetchOrder = async () => {
                setLoading(true);
                const docRef = doc(db, 'orders', orderId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrder({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // Handle order not found
                }
                setLoading(false);
            };
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return <AdminLayout><Spinner /></AdminLayout>;
    }

    if (!order) {
        return <AdminLayout><div>Order not found.</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <div>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                {/* Add more order details here */}
            </div>
        </AdminLayout>
    );
};

export default OrderDetailsPage;
