import * as FiIcons from 'react-icons/fi';

const PaymentOptions = ({ selectedMethod, onSelectMethod }) => {
    const paymentMethods = [
        { id: 'cod', name: 'Cash on Delivery', icon: <FiIcons.FiBox />, description: 'Pay with cash upon delivery.' },
        { id: 'card', name: 'Credit/Debit Card', icon: <FiIcons.FiCreditCard />, description: 'Secure payment with your card.' },
        { id: 'upi', name: 'UPI', icon: <FiIcons.FiDollarSign />, description: 'Pay with any UPI app.' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
                {paymentMethods.map(method => (
                    <div 
                        key={method.id}
                        onClick={() => onSelectMethod(method.id)}
                        className={`p-4 border-2 rounded-lg flex items-center cursor-pointer transition-all ${selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                    >
                        <div className="text-blue-600 mr-4">{method.icon}</div>
                        <div>
                            <h3 className="font-semibold">{method.name}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentOptions;
