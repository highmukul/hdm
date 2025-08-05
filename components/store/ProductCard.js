import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = product.mrp - product.price;
    const discountPercent = Math.round((discount / product.mrp) * 100);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
        >
            <div className="relative">
                <Image
                    src={product.imageUrls?.[0] || '/placeholder.png'}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover"
                />
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {discountPercent}% OFF
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-base font-medium truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="text-lg font-bold">₹{product.price.toFixed(2)}</p>
                        {discount > 0 && <p className="text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</p>}
                    </div>
                    <button
                        onClick={() => {
                            addToCart(product, 1);
                            toast.success(`${product.name} added to cart`);
                        }}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
