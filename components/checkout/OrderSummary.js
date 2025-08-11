import { useCart } from '../../context/CartContext';

const OrderSummary = () => {
    const { cartItems, cartTotal } = useCart();

    // These values could come from a global settings context in a real app
    const taxRate = 0.05; // 5% GST
    const deliveryFee = cartTotal > 499 ? 0 : 35; // Free delivery for orders > 499
    const platformFee = 5.00;

    const subtotal = cartTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee + platformFee;
    
    const totalMRP = cartItems.reduce((total, item) => total + (item.mrp || item.price) * item.quantity, 0);
    const totalDiscount = totalMRP - subtotal;


    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">Price Details</h2>
            
            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Price ({cartItems.length} items)</span>
                    <span className="font-medium">₹{totalMRP.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">- ₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span className="font-medium">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>GST (5%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 ? (
                        <span className="font-medium text-green-600">FREE</span>
                    ) : (
                        <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
                    )}
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                    <div className="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total Amount</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
