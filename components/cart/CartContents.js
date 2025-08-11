import { useCart } from '../../context/CartContext';
import * as FiIcons from 'react-icons/fi';
import CartSummary from './CartSummary';

const CartContents = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const platformFee = 2.00;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                 <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <ul>
                    {cartItems.map(item => {
                        const itemTotal = (item.price * item.quantity) + platformFee;
                        return (
                            <li key={item.id} className="flex items-start justify-between py-4 border-b last:border-b-0">
                                <div className="flex">
                                    <img src={item.imageUrls[0]} alt={item.name} className="h-20 w-20 object-cover rounded-lg mr-4"/>
                                    <div>
                                        <p className="font-semibold text-lg">{item.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                        <p className="text-gray-500">Price: ₹{item.price.toFixed(2)}</p>
                                        <p className="text-xs text-gray-400">+ ₹{platformFee.toFixed(2)} platform fee</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="font-bold text-lg mb-2">₹{itemTotal.toFixed(2)}</p>
                                    <div className="flex items-center">
                                        <div className="flex items-center border rounded-lg">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 disabled:opacity-50" disabled={item.quantity <= 1}><FiIcons.FiMinus/></button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><FiIcons.FiPlus/></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700 p-2"><FiIcons.FiTrash2/></button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="lg:col-span-1">
                 <CartSummary />
            </div>
        </div>
    );
};

export default CartContents;
