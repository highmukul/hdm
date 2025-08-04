import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRupeeSign, FaRoad } from 'react-icons/fa';
import { getFunctions, httpsCallable } from 'firebase/functions';

const NewBidModal = ({ bid, onDecline }) => {
    const handleAccept = async () => {
        const functions = getFunctions();
        const acceptBid = httpsCallable(functions, 'acceptBid');
        try {
            await acceptBid({ orderId: bid.orderId });
            // The modal will disappear automatically as the bid is deleted from the subcollection.
        } catch (error) {
            console.error("Failed to accept bid:", error.message);
        }
    };

    return (
        <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 p-5 bg-white shadow-2xl rounded-2xl z-50 max-w-lg mx-auto"
        >
            <div className="text-center">
                <p className="text-green-600 font-bold text-5xl mb-3">
                    <FaRupeeSign className="inline -mt-2" />{bid.earnings}
                </p>
                <p className="text-gray-500 -mt-2 mb-4">Your potential earnings</p>
            </div>
            
            <div className="flex items-center justify-around text-center border-t border-b py-4 my-4">
                <div className="flex items-center">
                    <FaRoad className="text-2xl text-indigo-500 mr-3" />
                    <div>
                        <p className="font-bold text-xl">{bid.distance} km</p>
                        <p className="text-sm text-gray-500">Distance</p>
                    </div>
                </div>
            </div>

            <div className="text-left mb-6">
                <p className="font-semibold text-gray-500 text-sm">DELIVER TO</p>
                <p className="flex items-center"><FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" /> {bid.customerAddress}</p>
            </div>
            
            <div className="flex justify-between space-x-4">
                <button onClick={onDecline} className="w-1/3 py-3 text-lg font-bold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Decline
                </button>
                <button onClick={handleAccept} className="w-2/3 py-3 text-lg font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
                    Accept
                </button>
            </div>
        </motion.div>
    );
};

export default NewBidModal;
