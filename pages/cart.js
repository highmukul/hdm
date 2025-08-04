import Layout from '../components/layout/Layout';
import CartContents from '../components/cart/CartContents';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { MobileRestriction } from '../components/hoc/withMobileRestriction';

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <MobileRestriction pageName="Shopping Cart">
        <Layout>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-10">Your Shopping Cart</h1>
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <CartContents />
                </div>
                <div>
                  <CartSummary />
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </Layout>
    </MobileRestriction>
  );
};

export default CartPage;