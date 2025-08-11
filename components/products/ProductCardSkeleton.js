import { motion } from 'framer-motion';

const ProductCardSkeleton = () => {
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
                <div className="flex-grow" />
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <div className="h-8 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse mr-2"></div>
                        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-20 h-10"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCardSkeleton;
