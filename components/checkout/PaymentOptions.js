import { FiCreditCard, FiDollarSign, FiBox } from 'react-icons/fi';

const paymentMethods = [
    { 
        id: 'cod', 
        title: 'Cash on Delivery', 
        description: 'Pay directly to the delivery person.', 
        icon: <FiDollarSign /> 
    },
    { 
        id: 'card', 
        title: 'Credit/Debit Card', 
        description: 'Pay securely online. All major cards accepted.', 
        icon: <FiCreditCard /> 
    },
    {
        id: 'upi',
        title: 'UPI',
        description: 'Pay with any UPI app like GPay, PhonePe.',
        icon: <FiBox /> // Placeholder icon, consider a better one for UPI
    }
];

const PaymentOptions = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Choose Payment Method</h2>
      <div className="space-y-4">
        {paymentMethods.map(method => (
          <label 
            key={method.id} 
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input 
              type="radio" 
              name="paymentMethod" 
              value={method.id} 
              checked={selectedMethod === method.id} 
              onChange={() => onSelectMethod(method.id)} 
              className="sr-only" 
            />
            <div className="text-blue-600 mr-4 text-xl">
                {method.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{method.title}</h4>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </label>
        ))}
      </div>
      
      {selectedMethod === 'card' && (
        <div className="p-4 border-t mt-6 text-center text-gray-500">
          <p>Online payment feature is currently under development.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
