import { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useAuth } from '../../context/AuthContext';
import { useCaptain } from '../../hooks/useCaptain';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, doc, where } from 'firebase/firestore';
import NewBidModal from './NewBidModal';
import { AnimatePresence } from 'framer-motion';

const containerStyle = { width: '100%', height: 'calc(100vh - 80px)' };

const OrderMap = () => {
    const { user } = useAuth();
    const { location } = useCaptain();
    const { isLoaded, loadError } = useGoogleMaps();
    
    const [activeOrder, setActiveOrder] = useState(null);
    const [bids, setBids] = useState([]);
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'captains', user.uid, 'bids'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newBids = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBids(newBids);
        });
        return unsubscribe;
    }, [user]);
    
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'orders'), where('captainId', '==', user.uid), where('status', 'in', ['Accepted', 'Out for Delivery']));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                setActiveOrder({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
            } else {
                setActiveOrder(null);
            }
        });
        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (!activeOrder || !isLoaded || !location) {
            setDirections(null); return;
        }
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin: location,
            destination: activeOrder.shippingAddress.location,
            travelMode: 'DRIVING',
        }, (result, status) => {
            if (status === 'OK') setDirections(result);
        });
    }, [activeOrder, isLoaded, location]);

    const handleDeclineBid = async (bidId) => {
        await deleteDoc(doc(db, 'captains', user.uid, 'bids', bidId));
    };

    if (loadError) return <div>Map cannot be loaded.</div>;
    if (!isLoaded || !location) return <div className="h-full flex items-center justify-center bg-background"><p className="text-text-secondary">Initializing map and location...</p></div>;

    return (
        <div className="relative">
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
                <Marker position={location} icon={{ url: '/bike.svg', scaledSize: new window.google.maps.Size(40, 40) }} />
                {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: 'var(--primary-color)', strokeWeight: 5 } }}/>}
            </GoogleMap>
            <AnimatePresence>
                {bids.length > 0 && <NewBidModal key={bids[0].id} bid={bids[0]} onDecline={() => handleDeclineBid(bids[0].id)} />}
            </AnimatePresence>
            {activeOrder && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-card-background shadow-2xl rounded-t-2xl z-10 border-t border-border">
                     <h2 className="text-xl font-bold text-text-primary">Active Delivery: ...{activeOrder.id.slice(-6)}</h2>
                    <p className="text-text-secondary">Deliver to: {activeOrder.shippingAddress.fullAddress}</p>
                </div>
            )}
        </div>
    );
};

export default OrderMap;
