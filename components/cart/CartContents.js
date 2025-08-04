import { useCart } from '../../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Image from 'next/image';

const CartContents = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Review Your Order</h2>
      <div className="divide-y divide-gray-200">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between py-5">
            <div className="flex items-center w-2/3">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={item.imageUrls?.[0] || '/placeholder.png'}
                  alt={item.name}
                  layout="fill"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} per unit</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={16} />
                </button>
                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={16} />
                </button>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100"
                aria-label="Remove item"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartContents;
