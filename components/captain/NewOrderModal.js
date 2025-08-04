import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRupeeSign, FaRoad } from 'react-icons/fa';
import { getFunctions, httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

const NewOrderModal = ({ bid, onDecline }) => {
    const handleAccept = async () => {
        const functions = getFunctions();
        const acceptBid = httpsCallable(functions, 'acceptBid');
        try {
            await acceptBid({ orderId: bid.orderId });
            toast.success("Order accepted!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <motion.div
            initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 p-5 bg-card-background shadow-2xl rounded-2xl z-50 max-w-lg mx-auto border border-border"
        >
            <div className="text-center">
                <p className="text-green-500 font-bold text-5xl mb-3">
                    <FaRupeeSign className="inline -mt-2" />{bid.earnings}
                </p>
                <p className="text-text-secondary -mt-2 mb-4">Your potential earnings</p>
            </div>
            
            <div className="flex items-center justify-around text-center border-t border-b border-border py-4 my-4">
                <div className="flex items-center">
                    <FaRoad className="text-2xl text-primary mr-3" />
                    <div>
                        <p className="font-bold text-xl text-text-primary">{bid.distance} km</p>
                        <p className="text-sm text-text-secondary">Distance</p>
                    </div>
                </div>
            </div>

            <div className="text-left mb-6">
                <p className="font-semibold text-text-secondary text-sm">DELIVER TO</p>
                <p className="flex items-center text-text-primary"><FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" /> {bid.customerAddress}</p>
            </div>
            
            <div className="flex justify-between space-x-4">
                <button onClick={onDecline} className="w-1/3 py-3 text-lg font-bold bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:opacity-90">Decline</button>
                <button onClick={handleAccept} className="w-2/3 py-3 text-lg font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">Accept</button>
            </div>
        </motion.div>
    );
};

export default NewOrderModal;
