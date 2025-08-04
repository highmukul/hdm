import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error("Sorry, this item is out of stock.");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full group border border-transparent hover:border-green-500 transition-colors"
    >
      <Link href={`/products/${product.id}`} passHref>
        <a className="block text-left flex-grow">
          {/* Image Container */}
          <div className="relative w-full h-36 md:h-40">
            <Image
              src={product.imageUrls?.[0] || '/placeholder.png'}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-base text-gray-800 truncate mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.unit || '1 unit'}</p>
            <div className="flex-grow" />
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold text-gray-800 text-lg">₹{product.price.toFixed(2)}</p>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                aria-label="Add to cart"
              >
                <FiPlus size={20} />
              </button>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
