import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useUserAddresses } from '../../hooks/useUserAddresses';

const UPI_APPS = [
    { name: 'Google Pay', icon: '/gpay.png' },
    { name: 'PhonePe', icon: '/phonepe.png' },
    { name: 'Paytm', icon: '/paytm.png' },
];

const CheckoutPage = () => {
    const router = useRouter();
    const { total, discount, platformFee, deliveryFee } = router.query;
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const { addresses, loading: addressesLoading } = useUserAddresses(user?.uid);
    
    const [status, setStatus] = useState('Confirm your delivery address.');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showUpiApps, setShowUpiApps] = useState(false);

    useEffect(() => {
        if (!addressesLoading && addresses.length > 0) {
            setSelectedAddress(addresses.find(a => a.isPrimary) || addresses[0]);
        }
    }, [addresses, addressesLoading]);

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    }
    
    const proceedToPayment = () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address.");
            return;
        }
        setStatus('Redirecting to payment...');
        setShowUpiApps(true);
    };

    const handleUpiSelection = async (appName) => {
        setShowUpiApps(false);
        setStatus(`Processing payment with ${appName}...`);

        const orderId = `HDM-${Date.now()}`;

        setTimeout(async () => {
            try {
                await addDoc(collection(db, 'orders'), {
                    orderId,
                    userId: user.uid,
                    items: cartItems,
                    total: parseFloat(total),
                    discount: parseFloat(discount),
                    platformFee: parseFloat(platformFee),
                    deliveryFee: parseFloat(deliveryFee),
                    shippingAddress: selectedAddress,
                    status: 'Paid',
                    createdAt: new Date(),
                });
                
                clearCart();
                router.push(`/order-confirmation?orderId=${orderId}`);

            } catch (error) {
                console.error("Error creating order: ", error);
                setStatus('Payment failed. Please try again.');
            }
        }, 2000);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8 text-center">{status}</h1>
                
                {addressesLoading ? <Spinner /> : (
                    <div className="max-w-3xl mx-auto">
                        {!showUpiApps ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
                                <div className="space-y-4 mb-8">
                                    {addresses.map(address => (
                                        <div key={address.id} onClick={() => handleAddressSelection(address)}
                                            className={`p-4 border rounded-lg cursor-pointer ${selectedAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''}`}>
                                            <p className="font-bold">{address.name}</p>
                                            <p>{address.addressLine1}, {address.addressLine2}</p>
                                            <p>{address.city}, {address.state} - {address.pincode}</p>
                                            <p>Mobile: {address.mobile}</p>
                                        </div>
                                    ))}
                                    <button onClick={() => router.push('/profile?section=addresses')} className="text-blue-600 hover:underline">
                                        + Add New Address
                                    </button>
                                </div>
                                <button onClick={proceedToPayment} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                                    Continue to Payment
                                </button>
                            </div>
                        ) : (
                             <div className="text-center">
                                {UPI_APPS.map(app => (
                                    <button
                                        key={app.name}
                                        onClick={() => handleUpiSelection(app.name)}
                                        className="w-full max-w-sm mx-auto flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4"
                                    >
                                        <img src={app.icon} alt={app.name} className="h-8 w-8 mr-4" />
                                        <span className="text-lg font-semibold">{app.name}</span>
                                    </button>
                                ))}
                             </div>
                        )}

                        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                           <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                           <p className="text-4xl font-bold text-gray-800">₹{total}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CheckoutPage;
