import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const CartSummary = () => {
    const { cartTotal } = useCart();
    const router = useRouter();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const taxRate = 0.05; // 5%
    const deliveryFee = cartTotal > 500 ? 0 : 30; // Free delivery over 500

    const subtotal = cartTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee - discount;

    const handleApplyCoupon = () => {
        // Mock coupon logic
        if (coupon.toUpperCase() === 'SAVE10') {
            setDiscount(subtotal * 0.10);
            toast.success('Coupon "SAVE10" applied!');
        } else {
            toast.error('Invalid coupon code.');
        }
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>
            
            {/* Coupon Code */}
            <div className="flex space-x-2 mb-6">
                <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg hover:bg-gray-300"
                >
                    Apply
                </button>
            </div>

            {/* Price Details */}
            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                disabled={subtotal === 0}
                className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary;
