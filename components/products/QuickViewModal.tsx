import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <FiIcons.FiX size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96">
                <Image
                  src={product.imageUrls?.[0] || '/placeholder.png'}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{product.name}</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">₹{product.salePrice?.toFixed(2)}</p>
                {product.mrp && <p className="text-lg text-gray-500 dark:text-gray-400 line-through mb-4">₹{product.mrp?.toFixed(2)}</p>}
                <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FiIcons.FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
