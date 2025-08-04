import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FiMapPin, FiNavigation, FiCheckCircle } from 'react-icons/fi';

const OrderCard = ({ order, isAssigned = false }) => {
    const handleUpdateStatus = async (status) => {
        try {
            const orderRef = doc(db, 'orders', order.id);
            await updateDoc(orderRef, { status });
            toast.success(`Order marked as ${status}!`);
        } catch (error) {
            toast.error('Failed to update order status.');
        }
    };

    const handleNavigate = () => {
        const { lat, lng } = order.shippingAddress.location;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500">Order #{order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-xl font-bold text-gray-800">Est. Earning: ₹{order.deliveryFee || '25'}</p>
                    </div>
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {order.status}
                    </span>
                </div>

                <div className="mt-4">
                    <div className="flex items-center text-gray-700">
                        <FiMapPin className="w-5 h-5 mr-3 text-gray-400" />
                        <span className="text-sm">{order.shippingAddress.fullAddress}</span>
                    </div>
                </div>
            </div>

            {isAssigned && (
                <div className="bg-gray-50 p-3 grid grid-cols-2 gap-2">
                    <button 
                        onClick={handleNavigate}
                        className="flex items-center justify-center py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        <FiNavigation className="mr-2" />
                        Navigate
                    </button>
                    {order.status === 'Out for Delivery' ? (
                         <button 
                            onClick={() => handleUpdateStatus('Delivered')}
                            className="flex items-center justify-center py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                        >
                            <FiCheckCircle className="mr-2" />
                            Complete
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleUpdateStatus('Out for Delivery')}
                            className="flex items-center justify-center py-2.5 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                        >
                            Confirm Pickup
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderCard;
