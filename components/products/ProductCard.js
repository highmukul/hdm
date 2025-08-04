import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
        addToCart(product, quantity);
        toast.success(`${quantity} x ${product.name} added!`);
    } else {
        toast.error("Out of stock!");
    }
  };

  return (
    <motion.div 
        whileHover={{ y: -5 }} 
        className="card flex flex-col h-full group"
    >
      <Link href={`/products/${product.id}`} passHref>
        <a className="block text-left flex-grow">
          <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
            <Image src={product.imageUrls?.[0] || '/placeholder.png'} alt={product.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg truncate mb-1 text-text-primary">{product.name}</h3>
            <p className="text-text-secondary text-sm">{product.category}</p>
          </div>
        </a>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-primary text-xl">₹{product.price.toFixed(2)}</p>
            <div className="flex items-center border border-border rounded-lg">
                <button onClick={(e) => {e.stopPropagation(); setQuantity(q => Math.max(1, q - 1))}} className="p-2 text-text-secondary hover:text-primary"><FaMinus size={12}/></button>
                <span className="px-3 font-bold text-text-primary">{quantity}</span>
                <button onClick={(e) => {e.stopPropagation(); setQuantity(q => Math.min(5, q + 1))}} className="p-2 text-text-secondary hover:text-primary"><FaPlus size={12}/></button>
            </div>
        </div>
        <button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full btn-primary disabled:opacity-50 disabled:scale-100">Add to Cart</button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
