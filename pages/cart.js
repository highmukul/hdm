import Layout from '../components/layout/Layout';
import CartContents from '../components/cart/CartContents';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <CartContents />
            </div>
            <div className="lg:col-span-4">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiShoppingCart className="mx-auto text-5xl text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/shop" passHref>
              <a className="inline-flex items-center bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700">
                <FiArrowLeft className="mr-2" />
                Continue Shopping
              </a>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
