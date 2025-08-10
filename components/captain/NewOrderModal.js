import * as FaIcons from 'react-icons/fa';

const NewOrderModal = ({ order, onAccept, onReject }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">New Order!</h2>
                <div className="space-y-2 text-gray-700">
                    <p className="flex items-center"><FaIcons.FaMapMarkerAlt className="mr-2 text-red-500" /> From: {order.store.name}</p>
                    <p className="flex items-center"><FaIcons.FaMapMarkerAlt className="mr-2 text-green-500" /> To: {order.shippingAddress.line1}</p>
                    <p className="flex items-center"><FaIcons.FaRoad className="mr-2" /> Distance: {order.distance} km</p>
                    <p className="flex items-center font-bold text-lg"><FaIcons.FaRupeeSign className="mr-2" /> Your Earning: ₹{order.deliveryFee}</p>
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={onReject} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold">Reject</button>
                    <button onClick={onAccept} className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default NewOrderModal;
