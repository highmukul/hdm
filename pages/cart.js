import Link from 'next/link';
import Layout from '../components/layout/Layout';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartContents from '../components/cart/CartContents';

const CartPage = () => {
    const { cartItems } = useCart();
    
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Your Cart</h1>
                    <Link href="/shop" legacyBehavior>
                        <a className="flex items-center text-blue-600 hover:text-blue-800">
                            <FiIcons.FiArrowLeft className="mr-2" /> Continue Shopping
                        </a>
                    </Link>
                </div>
                
                {cartItems.length > 0 ? (
                    <CartContents />
                ) : (
                    <div className="text-center py-20">
                        <FiIcons.FiShoppingCart size={60} className="mx-auto text-gray-400" />
                        <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CartPage;
