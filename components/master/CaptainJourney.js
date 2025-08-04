import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { setCaptainStatus } from '../../api/captains';
import { fetchCaptainActiveOrder, fetchAvailableOrders, acceptOrder, updateOrderStatus } from '../../api/orders';

// --- CORRECTED: Single import from the master components file ---
import { Spinner } from '../common/components.js';

import { BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const viewVariants = {
  enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: 'easeIn' } },
};

// --- Dashboard View ---
const DashboardView = ({ captain, setView, activeOrder, availableOrdersCount, onToggleStatus }) => {
    const isOnline = captain.status === 'active';
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome, {captain.name}</h1>
            <p className="text-gray-600">Your central command center.</p>

            <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-lg">{isOnline ? "You are Online" : "You are Offline"}</p>
                <div onClick={() => onToggleStatus(!isOnline)} className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${isOnline ? 'bg-primary' : 'bg-gray-300'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button onClick={() => setView('AVAILABLE_ORDERS')} className="bg-white p-6 rounded-lg shadow text-left hover:bg-gray-50 disabled:opacity-50" disabled={!isOnline || !!activeOrder}>
                    <BellIcon className="w-8 h-8 text-primary" /><h3 className="text-xl font-bold mt-2">Available Orders</h3><p className="text-gray-500">{isOnline ? `${availableOrdersCount} orders waiting` : "Go online to see orders"}</p>
                </button>
                <button onClick={() => setView('PROFILE')} className="bg-white p-6 rounded-lg shadow text-left hover:bg-gray-50">
                    <UserCircleIcon className="w-8 h-8 text-primary" /><h3 className="text-xl font-bold mt-2">My Profile</h3><p className="text-gray-500">View earnings & service areas</p>
                </button>
            </div>
             {activeOrder && (<div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"><h3 className="text-xl font-bold text-blue-800">Delivery in Progress</h3><p className="text-blue-700">You have an active order. Finish it to accept new ones.</p><button onClick={() => setView('ACTIVE_DELIVERY')} className="mt-4 font-bold text-blue-800 hover:underline">View Active Delivery →</button></div>)}
        </div>
    );
};

// --- Active Delivery View ---
const ActiveDeliveryView = ({ activeOrder, onUpdateStatus }) => {
    const { customerName, deliveryAddress, items } = activeOrder;
    return (<div className="p-6"><h1 className="text-3xl font-bold mb-6">Active Delivery</h1><div className="space-y-6"><div className="bg-white p-6 rounded-lg shadow"><h3 className="font-bold text-xl mb-2">Delivery Details</h3><p><strong>Customer:</strong> {customerName}</p><p><strong>Address:</strong> {deliveryAddress.street}, {deliveryAddress.city}, {deliveryAddress.zipCode}</p><a href={`https://maps.google.com/?q=${deliveryAddress.street}, ${deliveryAddress.city}`} target="_blank" rel="noreferrer" className="inline-block mt-4 bg-primary text-white py-2 px-4 rounded-md font-semibold">Navigate</a></div><div className="bg-white p-6 rounded-lg shadow"><h3 className="font-bold text-xl mb-2">Item Checklist</h3><ul className="space-y-2">{items.map(item => (<li key={item.id}>{item.name} (x{item.quantity})</li>))}</ul></div><div className="bg-white p-6 rounded-lg shadow"><h3 className="font-bold text-xl mb-2">Update Status</h3><div className="flex flex-col md:flex-row gap-4"><button onClick={() => onUpdateStatus(activeOrder.id, 'in_transit')} disabled={activeOrder.status === 'in_transit'} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold disabled:bg-gray-400">Mark as In Transit</button><button onClick={() => onUpdateStatus(activeOrder.id, 'delivered')} className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md font-semibold">Mark as Delivered</button></div></div></div></div>);
};

// --- The Master Captain Component ---
export default function CaptainJourney() {
    const { user, loading: authLoading } = useAuth();
    const [captain, setCaptain] = useState(null);
    const [currentView, setCurrentView] = useState('LOADING');
    const [activeOrder, setActiveOrder] = useState(null);
    const [availableOrders, setAvailableOrders] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const fetchData = useCallback(async () => {
        if (!user || !user.role || user.role !== 'captain') return;
        setCaptain(user); setLoadingData(true);
        const activeDelivery = await fetchCaptainActiveOrder(user.uid); setActiveOrder(activeDelivery);
        if (!activeDelivery && user.status === 'active') { const newOrders = await fetchAvailableOrders(user.serviceZipCodes); setAvailableOrders(newOrders); } else { setAvailableOrders([]); }
        if (activeDelivery) { setCurrentView('ACTIVE_DELIVERY'); } else { setCurrentView('DASHBOARD'); }
        setLoadingData(false);
    }, [user]);

    useEffect(() => { fetchData(); }, [fetchData]);
    
    const handleToggleStatus = async (isGoingOnline) => { const newStatus = isGoingOnline ? 'active' : 'inactive'; await setCaptainStatus(user.uid, newStatus); fetchData(); };
    const handleAcceptOrder = async (orderId) => { await acceptOrder(orderId, user.uid); fetchData(); };
    const handleUpdateStatus = async (orderId, newStatus) => { await updateOrderStatus(orderId, newStatus); fetchData(); };

    const ActiveView = () => {
      switch (currentView) {
        case 'DASHBOARD': return <DashboardView captain={captain} setView={setCurrentView} activeOrder={activeOrder} availableOrdersCount={availableOrders.length} onToggleStatus={handleToggleStatus} />;
        case 'AVAILABLE_ORDERS': return (<div className="p-6"><h1 className="text-3xl font-bold mb-6">Available Orders</h1><div className="space-y-4">{availableOrders.length > 0 ? availableOrders.map(order => (<div key={order.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center"><div><p className="font-bold">{order.items.length} items to {order.deliveryAddress.city}</p><p className="text-green-600 font-bold text-lg">${order.subtotal.toFixed(2)}</p></div><button onClick={() => handleAcceptOrder(order.id)} className="bg-primary text-white py-2 px-4 rounded-md">Accept</button></div>)) : <p>No orders in your area right now.</p>}</div><button onClick={() => setCurrentView('DASHBOARD')} className="mt-6 text-primary font-semibold">← Back to Dashboard</button></div>);
        case 'ACTIVE_DELIVERY': return activeOrder ? <ActiveDeliveryView activeOrder={activeOrder} onUpdateStatus={handleUpdateStatus} /> : <p>No active delivery.</p>;
        case 'PROFILE': return  <div className="p-6"><h1 className="text-3xl font-bold">My Profile</h1><p>Earnings history and profile settings coming soon.</p><button onClick={() => setCurrentView('DASHBOARD')} className="mt-6 text-primary font-semibold">← Back to Dashboard</button></div>;
        default: return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
      }
    };
    
    if (authLoading || !captain) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    return (<div className="min-h-screen bg-gray-100"><AnimatePresence exitBeforeEnter><motion.div key={currentView} variants={viewVariants} initial="exit" animate="enter" exit="exit"><ActiveView /></motion.div></AnimatePresence></div>);
}