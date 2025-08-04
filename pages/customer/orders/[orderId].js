import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { db } from '../../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';

const OrderTrackingPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [captainLocation, setCaptainLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const { isLoaded, loadError } = useGoogleMaps();

    useEffect(() => {
        if (!orderId) return;
        const unsubscribeOrder = onSnapshot(doc(db, 'orders', orderId), (doc) => {
            setOrder({ id: doc.id, ...doc.data() });
        });
        return unsubscribeOrder;
    }, [orderId]);

    useEffect(() => {
        if (!order || !order.captainId) return;
        const unsubscribeCaptain = onSnapshot(doc(db, 'captains', order.captainId), (doc) => {
            setCaptainLocation(doc.data()?.location);
        });
        return unsubscribeCaptain;
    }, [order]);

    useEffect(() => {
        if (!captainLocation || !order || !isLoaded) return;
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: captainLocation,
                destination: order.shippingAddress.location,
                travelMode: 'DRIVING',
            },
            (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                }
            }
        );
    }, [captainLocation, order, isLoaded]);


    if (loadError) return <div>Map cannot be loaded.</div>;
    if (!order) return <Layout><p>Loading order details...</p></Layout>;

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
                <div className="mb-4 p-4 bg-white rounded-lg shadow">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Status:</strong> <span className="font-semibold text-blue-600">{order.status}</span></p>
                    <p><strong>Estimated Delivery:</strong> 15-20 minutes</p>
                </div>
                <div className="h-96">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={order.shippingAddress.location}
                            zoom={15}
                        >
                            {directions && <DirectionsRenderer directions={directions} />}
                            <Marker position={order.shippingAddress.location} label="You" />
                            {captainLocation && <Marker position={captainLocation} label="Captain" />}
                        </GoogleMap>
                    ) : (
                        <p>Loading map...</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default OrderTrackingPage;
