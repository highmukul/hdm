import * as FaIcons from 'react-icons/fa';

const NewBidModal = ({ order, onPlaceBid, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Bid for this Order</h2>
                <div className="space-y-3 text-gray-600">
                    <p className="flex items-center"><FaIcons.FaMapMarkerAlt className="mr-3 text-red-500" /> From: {order.store.name}</p>
                    <p className="flex items-center"><FaIcons.FaMapMarkerAlt className="mr-3 text-green-500" /> To: {order.shippingAddress.line1}</p>
                    <p className="flex items-center"><FaIcons.FaRoad className="mr-3" /> Distance: ~{order.distance.toFixed(2)} km</p>
                    <p className="flex items-center text-lg font-semibold"><FaIcons.FaRupeeSign className="mr-3" /> Base Fee: ₹{order.deliveryFee.toFixed(2)}</p>
                </div>
                <div className="mt-6">
                    <label htmlFor="bid" className="block text-sm font-medium text-gray-700">Your Bid (must be lower than base fee)</label>
                    <input type="number" id="bid" name="bid" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Cancel</button>
                    <button onClick={() => onPlaceBid(/* get bid value */)} className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Place Bid</button>
                </div>
            </div>
        </div>
    );
};

export default NewBidModal;
