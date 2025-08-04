import { useState } from 'react';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const PaymentOptions = () => {
  const [selectedMethod, setSelectedMethod] = useState('cod');

  return (
    <div className="space-y-4">
      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${selectedMethod === 'cod' ? 'border-indigo-500 ring-2 ring-indigo-500' : ''}`}>
        <input type="radio" name="paymentMethod" value="cod" checked={selectedMethod === 'cod'} onChange={() => setSelectedMethod('cod')} className="sr-only" />
        <FaMoneyBillWave className="w-6 h-6 mr-4 text-green-500" />
        <div>
          <h4 className="font-semibold">Cash on Delivery</h4>
          <p className="text-sm text-gray-500">Pay with cash upon delivery.</p>
        </div>
      </label>

      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${selectedMethod === 'card' ? 'border-indigo-500 ring-2 ring-indigo-500' : ''}`}>
        <input type="radio" name="paymentMethod" value="card" checked={selectedMethod === 'card'} onChange={() => setSelectedMethod('card')} className="sr-only" />
        <FaCreditCard className="w-6 h-6 mr-4 text-blue-500" />
        <div>
          <h4 className="font-semibold">Credit/Debit Card</h4>
          <p className="text-sm text-gray-500">Pay securely with your card.</p>
        </div>
      </label>
      
      {/* Placeholder for card details form */}
      {selectedMethod === 'card' && (
        <div className="p-4 border-t mt-4">
          <p className="text-center text-gray-500">Card payment integration coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;