import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useRouter } from 'next/router';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { trackEvent } = useAnalytics();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, 1);
      trackEvent('add_to_cart', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: 1
        }],
        value: product.price,
        currency: 'INR'
      });
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error("Sorry, this item is out of stock.");
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, 1);
      trackEvent('buy_now', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: 1
        }],
        value: product.price,
        currency: 'INR'
      });
      router.push('/checkout');
    } else {
      toast.error("Sorry, this item is out of stock.");
    }
  };

  const getDiscountedPrice = () => {
    const rule = product.discountRules?.[0];
    if (!rule) return product.price;

    if (rule.type === 'flat') {
      return product.price - rule.value;
    } else if (rule.type === 'percent') {
      return product.price * (1 - rule.value / 100);
    }
    return product.price;
  };

  const discountedPrice = getDiscountedPrice();
  const platformFee = product.price * (product.platformFeePercent / 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full group border border-transparent hover:border-green-500 transition-colors"
      onClick={() => trackEvent('select_content', { content_type: 'product', item_id: product.id })}
    >
      <Link href={`/products/${product.id}`} className="block text-left flex-grow">
          <div className="relative w-full h-36 md:h-40">
            <Image
              src={product.imageUrls?.[0] || '/placeholder.png'}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {product.stock < 5 && product.stock > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <FiIcons.FiAlertCircle className="mr-1" /> Only {product.stock} left!
                </div>
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-base text-gray-800 truncate mb-1">{product.name}</h3>
            <div className="flex-grow" />
            <div className="flex justify-between items-center mt-2">
                <div>
                    <p className="font-bold text-gray-800 text-lg">₹{discountedPrice.toFixed(2)}</p>
                    {discountedPrice < product.mrp && <p className="text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</p>}
                    <p className="text-xs text-gray-400" title={`Platform Fee: ₹${platformFee.toFixed(2)}`}>+ platform fee</p>
                </div>
              <div className="flex items-center">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400 mr-2"
                  aria-label="Add to cart"
                >
                  <FiIcons.FiPlus size={20} />
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                  aria-label="Buy Now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
