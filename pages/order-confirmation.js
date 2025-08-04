import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmationPage = () => {
    const router = useRouter();
    const { orderId } = router.query;

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800">Thank You for Your Order!</h1>
                <p className="text-gray-600 mt-4">Your order has been placed successfully.</p>
                {orderId && (
                    <p className="text-lg mt-2">
                        Your Order ID is: <span className="font-semibold text-indigo-600">{orderId}</span>
                    </p>
                )}
                <p className="mt-6">
                    We have sent an order confirmation to your email. You can check the status of your order in your order history.
                </p>
                <div className="mt-10">
                    <Link href="/profile?tab=orders">
                        <a className="btn-primary mr-4">View Order History</a>
                    </Link>
                    <Link href="/shop">
                        <a className="text-indigo-600 hover:text-indigo-800 font-semibold">
                            Continue Shopping
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default OrderConfirmationPage;