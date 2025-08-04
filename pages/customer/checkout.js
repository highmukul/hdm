import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
    const { user } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user) return;
        const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'addresses'), (snapshot) => {
            setAddresses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [user]);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please select a shipping address.');
            return;
        }
        setLoading(true);

        try {
            const order = {
                customerId: user.uid,
                items: cartItems,
                total: cartTotal,
                shippingAddress: selectedAddress,
                paymentMethod,
                status: 'pending',
                createdAt: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, 'orders'), order);
            clearCart();
            toast.success('Order placed successfully!');
            router.push(`/customer/orders/${docRef.id}`);
        } catch (error) {
            toast.error('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="space-y-4">
                            {addresses.map(address => (
                                <div
                                    key={address.id}
                                    className={`p-4 border rounded-lg cursor-pointer ${selectedAddress?.id === address.id ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
                                    onClick={() => setSelectedAddress(address)}
                                >
                                    <p className="font-semibold">{address.fullAddress}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => router.push('/customer/profile')} className="mt-4 text-blue-600">Add new address</button>

                        <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-500 ring-2 ring-blue-500' : ''}`} onClick={() => setPaymentMethod('cod')}>
                                <p className="font-semibold">Cash on Delivery</p>
                            </div>
                            <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-blue-500 ring-2 ring-blue-500' : ''}`} onClick={() => setPaymentMethod('upi')}>
                                <p className="font-semibold">UPI</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || cartItems.length === 0}
                                className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutPage;
