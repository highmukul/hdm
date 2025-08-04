import { FaMapMarkerAlt, FaStore, FaClock } from 'react-icons/fa';

const OrderCard = ({ order, isActive = false }) => {
    // Dummy handler
    const handleAccept = () => {
        console.log(`Accepted order ${order.id}`);
    }

    return (
        <div className={`bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 ${isActive ? 'border-4 border-green-500' : ''}`}>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500">Order ID: {order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-2xl font-bold text-gray-800">₹{order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2"/>
                        <span>{new Date(order.createdAt.seconds * 1000).toLocaleTimeString()}</span>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                        <FaStore className="w-6 h-6 mr-4 text-indigo-500 mt-1" />
                        <div>
                            <p className="font-semibold">Pickup From</p>
                            <p className="text-gray-600">Hadoti Supermart, Main Market</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <FaMapMarkerAlt className="w-6 h-6 mr-4 text-green-500 mt-1" />
                        <div>
                            <p className="font-semibold">Deliver To</p>
                            <p className="text-gray-600">{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4">
                {isActive ? (
                    <button className="w-full py-3 text-white font-bold bg-green-600 rounded-lg hover:bg-green-700">
                        View Delivery Details
                    </button>
                ) : (
                    <button onClick={handleAccept} className="w-full btn-primary">
                        Accept Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;