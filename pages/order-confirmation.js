import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import * as FaIcons from 'react-icons/fa';
import Link from 'next/link';

const OrderConfirmationPage = () => {
    const router = useRouter();
    const { orderId } = router.query;

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <FaIcons.FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-800">Thank you for your order!</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Your order <span className="font-bold text-blue-600">#{orderId}</span> has been placed successfully.
                </p>
                <p className="mt-2 text-gray-500">
                    We've sent a confirmation to your email. You can also track your order status in your profile.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href={`/track-order/${orderId}`} legacyBehavior>
                        <a className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1">
                            Track Your Order
                        </a>
                    </Link>
                    <Link href="/shop" legacyBehavior>
                        <a className="py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                            Continue Shopping
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default OrderConfirmationPage;
