import { useCart } from '../../context/CartContext';

const OrderSummary = () => {
    const { subtotal, total, discount, platformFee, deliveryFee } = useCart();

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
