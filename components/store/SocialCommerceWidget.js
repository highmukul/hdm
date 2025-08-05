import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

export const SocialCommerceWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-center"
        >
            <div>
                <h3 className="text-xl font-bold text-gray-800">Share & Save</h3>
                <p className="text-gray-600">Invite 3 friends to unlock extra discounts</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                </div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600">
                    <FaWhatsapp size={24} />
                </button>
                <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                    <FaFacebook size={24} />
                </button>
            </div>
        </motion.div>
    );
};
