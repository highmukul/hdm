import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiZap, FiShield } from 'react-icons/fi';

const Benefit = ({ icon, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            {icon}
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{children}</p>
        </div>
    </div>
);

const CaptainPendingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 text-center"
            >
                <FiClock className="text-5xl text-yellow-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Application is Under Review</h1>
                <p className="text-gray-600 text-lg mb-8">
                    Thank you for joining us! We're currently verifying your documents. This usually takes 24-48 hours. We'll notify you via email as soon as your profile is approved.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-2xl mt-8"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Get Ready for the Benefits!</h2>
                <div className="space-y-8">
                    <Benefit icon={<FiDollarSign size={24} />} title="Competitive Earnings">
                        Get paid for every delivery you make. The more you deliver, the more you earn.
                    </Benefit>
                    <Benefit icon={<FiZap size={24} />} title="Flexible Hours">
                        Be your own boss. Work when you want, for as long as you want.
                    </Benefit>
                    <Benefit icon={<FiShield size={24} />} title="Safety First">
                        We're committed to your safety on the road, with in-app safety features and support.
                    </Benefit>
                </div>
            </motion.div>
        </div>
    );
};

export default CaptainPendingPage;
