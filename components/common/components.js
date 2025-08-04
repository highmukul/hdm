import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// --- UI Primitive: Spinner ---
export const Spinner = () => {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>;
};

// --- Products: Skeleton Card ---
export const ProductSkeleton = () => {
  return (
    <div className="border border-border rounded-lg p-4 w-full">
      <div className="animate-pulse flex flex-col h-full">
        <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full rounded-md"></div>
        <div className="flex-1 space-y-4 py-4"><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div></div>
        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-full rounded-md mt-auto"></div>
      </div>
    </div>
  );
};

// --- Profile: Order History Item (Accordion) ---
const statusStyles = { pending_assignment: 'bg-yellow-100 text-yellow-800', accepted: 'bg-blue-100 text-blue-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };

export const OrderHistoryItem = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="card">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><p className="text-xs text-text-secondary uppercase font-semibold">Order ID</p><p className="font-mono text-sm text-text-primary truncate">...{order.id.slice(-6)}</p></div>
                    <div><p className="text-xs text-text-secondary uppercase font-semibold">Date</p><p className="text-sm text-text-primary">{order.createdAt}</p></div>
                    <div><p className="text-xs text-text-secondary uppercase font-semibold">Total</p><p className="font-bold text-text-primary">₹{order.total.toFixed(2)}</p></div>
                    <div><p className="text-xs text-text-secondary uppercase font-semibold">Status</p><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[order.status]}`}>{order.status.replace('_', ' ')}</span></div>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-text-secondary transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <div className="border-t border-border p-6">
                        <h4 className="font-bold mb-4 text-text-primary">Items in this order:</h4>
                        <ul className="space-y-3">{order.items.map(item => (<li key={item.id} className="flex justify-between items-center text-sm"><p className="text-text-primary">{item.name} <span className="text-text-secondary">x {item.quantity}</span></p><p className="font-medium text-text-primary">₹{(item.price * item.quantity).toFixed(2)}</p></li>))}</ul>
                    </div>
                )}
            </AnimatePresence>
            {(order.status === 'Accepted' || order.status === 'Out for Delivery') && (
                <div className="border-t border-border p-4 bg-background text-center">
                    <Link href={`/track-order/${order.id}`}/><a className="font-semibold text-primary hover:text-primary-hover">Track Live Order</a>
                </div>
            )}
        </div>
    );
};

// --- Checkout: Order Summary Card ---
export const OrderSummary = ({ cartSubtotal, onPromoApplied }) => {
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const deliveryFee = cartSubtotal >= 250 ? 0 : 70;
    const total = cartSubtotal + deliveryFee - discount;
    
    const handleApplyPromo = async () => {
        const promoRef = doc(db, 'promocodes', promoCode);
        const promoSnap = await getDoc(promoRef);
        if (promoSnap.exists()) {
            const { value, type } = promoSnap.data();
            const discountAmount = type === 'percentage' ? (cartSubtotal * value) / 100 : value;
            setDiscount(discountAmount);
            onPromoApplied(discountAmount);
            toast.success(`Promo code applied!`);
        } else {
            toast.error("Invalid promo code.");
        }
    };

    return (
        <div className="bg-background rounded-lg p-6">
            <h2 className="text-xl font-bold border-b border-border pb-4 mb-4 text-text-primary">Order Summary</h2>
            <div className="flex space-x-2 mb-6">
                <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} placeholder="HAVEAPROMO" className="input-field flex-grow" />
                <button onClick={handleApplyPromo} className="btn-primary" disabled={!promoCode}>Apply</button>
            </div>
            <div className="space-y-2">
                 <div className="flex justify-between text-sm text-text-secondary"><p>Subtotal</p><p>₹{cartSubtotal.toFixed(2)}</p></div>
                 {discount > 0 && <div className="flex justify-between text-sm text-green-500"><p>Discount</p><p>- ₹{discount.toFixed(2)}</p></div>}
                 <div className="flex justify-between text-sm text-text-secondary"><p>Delivery Fee</p><p>{deliveryFee === 0 ? <span className="text-green-500">FREE</span> : `₹${deliveryFee.toFixed(2)}`}</p></div>
                 <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2 text-text-primary"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
            </div>
        </div>
    );
};
