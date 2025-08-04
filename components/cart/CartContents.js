import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Image from 'next/image';

const CartContents = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Cart Items</h2>
      <div className="divide-y divide-border">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Image src={item.imageUrls?.[0] || '/placeholder.png'} alt={item.name} width={64} height={64} className="rounded object-cover" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-text-primary">{item.name}</h3>
                <p className="text-text-secondary">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><FaMinus size={12}/></button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><FaPlus size={12}/></button>
                </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartContents;
