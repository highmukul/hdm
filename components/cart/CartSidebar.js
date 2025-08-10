import { useCart } from '../../context/CartContext';
import * as FiIcons from 'react-icons/fi';
import Link from 'next/link';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();

    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={onClose}><FiIcons.FiX size={24} /></button>
            </div>
            
            {cartItems.length > 0 ? (
                <>
                    <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center mb-4">
                                <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price}</p>
                                </div>
                                <button onClick={() => clearCart()} className="text-red-500"><FiIcons.FiTrash2 /></button>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" legacyBehavior>
                            <a className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Checkout</a>
                        </Link>
                    </div>
                </>
            ) : (
                <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartSidebar;
