import { motion } from 'framer-motion';

const StoreCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
        >
            <div className="relative w-full h-40 bg-gray-200 animate-pulse"></div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
        </motion.div>
    );
};

export default StoreCardSkeleton;
