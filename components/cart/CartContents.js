import { useCart } from '../../context/CartContext';
import * as FiIcons from 'react-icons/fi';

const CartContents = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                            <div className="flex items-center">
                                <img src={item.imageUrls[0]} alt={item.name} className="h-16 w-16 object-cover rounded-lg mr-4"/>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center border rounded-lg">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 disabled:opacity-50" disabled={item.quantity <= 1}><FiIcons.FiMinus/></button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><FiIcons.FiPlus/></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700 p-2"><FiIcons.FiTrash2/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:col-span-1">
                 {/* This would be the CartSummary component */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-28">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full mt-6 btn-primary">Checkout</button>
                 </div>
            </div>
        </div>
    );
};

export default CartContents;
