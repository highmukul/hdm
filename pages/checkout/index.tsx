import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { addDoc, collection, DocumentData } from 'firebase/firestore';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import OrderSummary from '../../components/checkout/OrderSummary';
import { NextPage } from 'next';
import React from 'react';
import toast from 'react-hot-toast';

const STEPS = {
    ADDRESS: 1,
    PAYMENT: 2,
    CONFIRMATION: 3,
};

interface Address extends DocumentData {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    mobile: string;
    isPrimary: boolean;
}

const CheckoutPage: NextPage = () => {
    const router = useRouter();
    const { cartItems, clearCart, total } = useCart();
    const { user } = useAuth();
    const { addresses, loading: addressesLoading } = useUserAddresses(user?.uid);
    
    const [step, setStep] = useState(STEPS.ADDRESS);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!addressesLoading && addresses.length > 0) {
            setSelectedAddress(addresses.find(a => a.isPrimary) || addresses[0]);
        }
    }, [addresses, addressesLoading]);

    const handlePlaceOrder = async () => {
        if (!user) {
            toast.error("You must be logged in to place an order.");
            return;
        }

        if (!selectedAddress) {
            toast.error("Please select a delivery address.");
            return;
        }

        setProcessing(true);
        try {
            const orderId = `HDM-${Date.now()}`;
            await addDoc(collection(db, 'orders'), {
                orderId,
                userId: user.uid,
                items: cartItems,
                total: total,
                shippingAddress: selectedAddress,
                status: 'Paid',
                createdAt: new Date(),
            });
            
            clearCart();
            router.push(`/order-confirmation?orderId=${orderId}`);
        } catch (error) {
            console.error("Error creating order: ", error);
            toast.error('Order placement failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };
    
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold">Checkout</h1>
                            <div className="flex items-center space-x-4">
                                <span className={step >= STEPS.ADDRESS ? 'text-indigo-600' : ''}>Address</span>
                                <span className="text-gray-400">{'>'}</span>
                                <span className={step >= STEPS.PAYMENT ? 'text-indigo-600' : ''}>Payment</span>
                            </div>
                        </div>

                        {addressesLoading ? <Spinner /> : (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
                                <div className="space-y-4 mb-8">
                                    {addresses.map(address => (
                                        <div key={address.id} onClick={() => setSelectedAddress(address)}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAddress?.id === address.id ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'hover:border-gray-400'}`}>
                                            <p className="font-bold">{address.name}</p>
                                            <p>{address.addressLine1}, {address.addressLine2}</p>
                                            <p>{address.city}, {address.state} - {address.pincode}</p>
                                            <p>Mobile: {address.mobile}</p>
                                        </div>
                                    ))}
                                    <button onClick={() => router.push('/profile?section=addresses')} className="text-indigo-600 hover:underline font-semibold">
                                        + Add New Address
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <OrderSummary />
                        <div className="mt-8">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!selectedAddress || processing}
                                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                            >
                                {processing ? <Spinner /> : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutPage;
