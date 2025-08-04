import { useCart } from '../../context/CartContext';
import { FiX, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={onClose} className="p-2">
                    <FiX />
                </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-140px)]">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center">
                                <Image src={item.imageUrls?.[0] || '/placeholder.png'} alt={item.name} width={64} height={64} className="rounded object-cover" />
                                <div className="ml-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">₹{item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-l">-</button>
                                        <span className="px-3 border-t border-b">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-r">+</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                                <FiTrash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/customer/checkout">
                    <a className="w-full block text-center py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                        Proceed to Checkout
                    </a>
                </Link>
            </div>
        </div>
    );
};
