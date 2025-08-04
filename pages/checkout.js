import { useState } from 'react';
import Layout from '../components/layout/Layout';
import AddressForm from '../components/profile/AddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentOptions from '../components/checkout/PaymentOptions';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import withMobileRestriction from '../components/hoc/withMobileRestriction';

const steps = [
    { name: 'Shipping', icon: <FiMapPin /> },
    { name: 'Payment', icon: <FiCreditCard /> },
    { name: 'Confirmation', icon: <FiCheckCircle /> },
];

const CheckoutPage = () => {
    const { user } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (!user || !selectedAddress || cartItems.length === 0) {
            toast.error("Please ensure you're logged in, an address is selected, and your cart isn't empty.");
            return;
        }
        setLoading(true);

        const orderData = {
            userId: user.uid,
            items: cartItems,
            total: cartTotal, // Assuming OrderSummary handles all calculations
            shippingAddress: selectedAddress,
            paymentMethod,
            status: 'Pending',
            createdAt: serverTimestamp(),
        };

        try {
            const orderRef = await addDoc(collection(db, 'orders'), orderData);
            clearCart();
            toast.success("Order placed successfully!");
            router.push(`/order-confirmation?orderId=${orderRef.id}`);
        } catch (error) {
            toast.error("There was an issue placing your order.");
            console.error("Order placement error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
                
                {/* Stepper */}
                <div className="flex justify-center items-center mb-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${index <= currentStep ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-100 border-gray-300'}`}>
                                {step.icon}
                            </div>
                            <span className={`ml-3 mr-6 font-semibold ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step.name}</span>
                            {index < steps.length - 1 && <div className="w-16 h-0.5 bg-gray-300"></div>}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8">
                        {currentStep === 0 && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">Select Shipping Address</h2>
                                <AddressForm onSelectAddress={setSelectedAddress} />
                            </div>
                        )}
                        {currentStep === 1 && (
                            <PaymentOptions selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />
                        )}
                    </div>
                    
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <OrderSummary />
                            {currentStep === 0 && (
                                <button onClick={() => setCurrentStep(1)} disabled={!selectedAddress} className="w-full btn-primary">
                                    Continue to Payment
                                </button>
                            )}
                            {currentStep === 1 && (
                                <button onClick={handlePlaceOrder} disabled={loading} className="w-full btn-primary">
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withMobileRestriction(CheckoutPage);
