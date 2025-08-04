import Layout from '../components/layout/Layout';
import AddressForm from '../components/profile/AddressForm';
import { OrderSummary } from '../components/common/components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FaGift } from 'react-icons/fa';
import { MobileRestriction } from '../components/hoc/withMobileRestriction';

const CheckoutPage = () => {
    const { user } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [isGift, setIsGift] = useState(false);
    const [giftMessage, setGiftMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const subtotal = cartTotal;
    const deliveryFee = subtotal >= 250 ? 0 : 70;
    const totalAmount = (subtotal - discount + deliveryFee).toFixed(2);
    
    const handlePlaceOrder = async () => {
        if (!user || !selectedAddress || cartItems.length === 0) return;
        setLoading(true);

        const orderData = { userId: user.uid, items: cartItems, subtotal, discount, deliveryFee, total: parseFloat(totalAmount), isGift, giftMessage: isGift ? giftMessage : '', shippingAddress: selectedAddress, status: 'Pending', createdAt: serverTimestamp() };

        try {
            const orderRef = await addDoc(collection(db, 'orders'), orderData);
            const upiId = 'learnwithmukul01-1@oksbi';
            const upiUrl = `upi://pay?pa=${upiId}&pn=Hadoti%20Daily%20Mart&am=${totalAmount}&cu=INR&tn=Order%20${orderRef.id}`;
            await clearCart();
            window.location.href = upiUrl;
            toast.success("Order placed! Redirecting...");
            setTimeout(() => router.push(`/order-confirmation?orderId=${orderRef.id}`), 2000);
        } catch {
            toast.error("Could not place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MobileRestriction pageName="Checkout">
            <Layout>
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold text-center mb-10 text-text-primary">Checkout</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card p-6"><h2 className="text-xl font-semibold mb-4 text-text-primary">Shipping Address</h2><AddressForm onSelectAddress={setSelectedAddress}/></div>
                            <div className="card p-6">
                                <h2 className="text-xl font-semibold mb-4 text-text-primary">Gifting Option</h2>
                                <div className="flex items-center"><input type="checkbox" id="isGift" checked={isGift} onChange={(e) => setIsGift(e.target.checked)} className="h-5 w-5 text-primary rounded mr-3 focus:ring-primary"/><label htmlFor="isGift" className="flex items-center text-text-primary"><FaGift className="mr-2 text-pink-500"/>This is a gift.</label></div>
                                {isGift && <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Add a gift message (optional)" className="input-field w-full mt-4" rows="2"></textarea>}
                            </div>
                        </div>
                        <div className="sticky top-28">
                           <OrderSummary cartSubtotal={subtotal} onPromoApplied={setDiscount} />
                           <button onClick={handlePlaceOrder} className="w-full btn-primary mt-6" disabled={!selectedAddress || cartItems.length === 0 || loading}>{loading ? 'Processing...' : `Pay ₹${totalAmount}`}</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </MobileRestriction>
    );
};

export default CheckoutPage;
