const OrderSummary = ({ cartItems, cartTotal }) => {
    const taxRate = 0.05;
    const deliveryFee = 15.00;
    const platformFee = 5.00;

    const subtotal = cartTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee + platformFee;
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Price Details</h2>
        
        <div className="space-y-3 border-t pt-6">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price ({cartItems.length} items)</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">- ₹0.00</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">₹{platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
            </div>
        </div>
      </div>
    );
  };
  
  export default OrderSummary;