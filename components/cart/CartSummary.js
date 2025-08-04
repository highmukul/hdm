import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/router';

const CartSummary = () => {
  const { cartTotal } = useCart();
  const router = useRouter();

  // Assuming a fixed tax rate for now. This could come from settings.
  const taxRate = 0.05; 
  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-28">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={handleCheckout} 
        className="w-full btn-primary mt-8"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;