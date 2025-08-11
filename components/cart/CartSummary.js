import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import toast from 'react-hot-toast';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const CartSummary = () => {
    const { cartTotal, cartItems } = useCart();
    const { user } = useAuth();
    const { settings } = useSettings();
    const router = useRouter();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);

    const platformFee = settings.platformFee.isEnabled ? settings.platformFee.amount : 0;
    const deliveryFee = cartTotal > settings.deliveryFee.freeFrom ? 0 : settings.deliveryFee.charge;

    const subtotal = cartTotal;
    const total = subtotal + deliveryFee + platformFee - discount;

    const handleApplyCoupon = async () => {
        if (!coupon) {
            toast.error('Please enter a coupon code.');
            return;
        }
        const couponRef = doc(db, 'promocodes', coupon.toUpperCase());
        const couponSnap = await getDoc(couponRef);

        if (couponSnap.exists()) {
            const couponData = couponSnap.data();
            let discountValue = 0;
            if (couponData.type === 'percentage') {
                discountValue = subtotal * (couponData.value / 100);
            } else {
                discountValue = couponData.value;
            }
            setDiscount(discountValue);
            setCouponApplied(true);
            toast.success(`Coupon "${couponData.code}" applied!`);
        } else {
            toast.error('Invalid coupon code.');
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (!user) {
            toast.error("Please log in to proceed.");
            router.push(`/login?redirect=/cart`);
            return;
        }
        
        router.push({
            pathname: '/checkout',
            query: { total: total.toFixed(2), discount: discount.toFixed(2), platformFee: platformFee.toFixed(2), deliveryFee: deliveryFee.toFixed(2) }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm sticky top-28">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Summary</h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2 text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="w-full px-3 py-2 border rounded-l-md focus:outline-none dark:bg-gray-700 dark:text-white"
                        disabled={couponApplied}
                    />
                    <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-r-md hover:bg-gray-700 disabled:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                        disabled={couponApplied}
                    >
                        Apply
                    </button>
                </div>
            </div>
            
            <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary;
