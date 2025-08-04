import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { db } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { FaClock } from 'react-icons/fa';

const containerStyle = { width: '100%', height: '60vh' };

const TrackOrderPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const { isLoaded, loadError } = useGoogleMaps();
    const [order, setOrder] = useState(null);
    const [captainLocation, setCaptainLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [eta, setEta] = useState('');

    useEffect(() => {
        if (!orderId) return;
        const orderRef = doc(db, 'orders', orderId);
        const unsubOrder = onSnapshot(orderRef, (doc) => {
            if (doc.exists()) {
                const orderData = { id: doc.id, ...doc.data() };
                setOrder(orderData);
                if (orderData.captainId) {
                    const captainRef = doc(db, 'captains', orderData.captainId);
                    const unsubCaptain = onSnapshot(captainRef, (capDoc) => {
                        if (capDoc.exists()) setCaptainLocation(capDoc.data().location);
                    });
                    return () => unsubCaptain();
                }
            }
        });
        return () => unsubOrder();
    }, [orderId]);

    useEffect(() => {
        if (!isLoaded || !captainLocation || !order?.shippingAddress?.location) return;
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin: captainLocation,
            destination: order.shippingAddress.location,
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === 'OK') {
                setDirections(result);
                setEta(result.routes[0].legs[0].duration.text);
            }
        });
    }, [isLoaded, captainLocation, order]);

    const center = captainLocation || order?.shippingAddress?.location;

    if (loadError) return <Layout><div className="text-center p-10">Map cannot be loaded.</div></Layout>;
    
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="card overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h1 className="text-2xl font-bold text-text-primary">Your order is on its way!</h1>
                        <p className="text-text-secondary">Order ID: <span className="font-mono">{orderId}</span></p>
                        <div className="flex items-center text-xl font-bold text-primary mt-4">
                            <FaClock className="mr-3" />
                            <span>Estimated Arrival: {eta || 'Calculating...'}</span>
                        </div>
                    </div>
                    {isLoaded && center ? (
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                            {captainLocation && <Marker position={captainLocation} icon={{ url: '/bike.svg', scaledSize: new window.google.maps.Size(50, 50) }} />}
                            {order?.shippingAddress?.location && <Marker position={order.shippingAddress.location} icon={{ url: '/home_pin.svg', scaledSize: new window.google.maps.Size(40, 40) }} />}
                            {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: 'var(--primary-color)', strokeWeight: 5 }, suppressMarkers: true }} />}
                        </GoogleMap>
                    ) : (
                        <div style={containerStyle} className="flex items-center justify-center bg-background animate-pulse"><p className="text-text-secondary">Loading map...</p></div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TrackOrderPage;
