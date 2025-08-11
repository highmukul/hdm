import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import { DocumentData } from 'firebase/firestore';

export interface Product extends DocumentData {
    id: string;
    name: string;
    salePrice: number;
    mrp: number;
    stock: number;
    imageUrls: string[];
}

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { trackEvent } = useAnalytics();
  const router = useRouter();

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, 1);
      trackEvent('add_to_cart', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.salePrice,
          quantity: 1
        }],
        value: product.salePrice,
        currency: 'INR'
      });
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error("Sorry, this item is out of stock.");
    }
  };

  const handleQuickView = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onQuickView(product);
  };
  
  const displayPrice = product.salePrice;
  
  const discountPercentage = product.mrp && displayPrice < product.mrp
    ? Math.round(((product.mrp - displayPrice) / product.mrp) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full group border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all duration-300"
      onClick={() => trackEvent('select_content', { content_type: 'product', item_id: product.id })}
    >
      <Link href={`/products/${product.id}`} className="block text-left flex-grow">
          <div className="relative w-full h-48 group">
            <Image
              src={product.imageUrls?.[0] || '/placeholder.png'}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <button
                    onClick={handleQuickView}
                    className="text-white text-sm font-semibold bg-indigo-600 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    Quick View
                </button>
            </div>
            {discountPercentage > 0 && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {discountPercentage}% OFF
              </div>
            )}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white font-bold text-lg">Out of Stock</p>
                </div>
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate mb-1">{product.name}</h3>
            <div className="flex-grow" />
            <div className="flex justify-between items-baseline mt-2">
                <div>
                    <p className="font-bold text-xl text-gray-900 dark:text-white">₹{displayPrice?.toFixed(2)}</p>
                    {discountPercentage > 0 && <p className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{product.mrp?.toFixed(2)}</p>}
                </div>
            </div>
          </div>
      </Link>
      <div className="p-4 pt-0">
        <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Add to cart"
        >
            <FiIcons.FiShoppingCart className="mr-2" />
            Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
