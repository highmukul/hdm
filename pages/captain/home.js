import { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { OrderCard } from '../../components/captain/OrderCard';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

const CaptainHomePage = () => {
    const { user } = useAuth();
    const { isLoaded, loadError } = useGoogleMaps();
    const [captainLocation, setCaptainLocation] = useState(null);
    const [pendingOrders, setPendingOrders] = useState([]);
    const router = useRouter();

    const debouncedUpdateLocation = useCallback(
        debounce((uid, newLocation) => {
            if (uid) {
                updateDoc(doc(db, 'captains', uid), { location: newLocation });
            }
        }, 2000),
        []
    );

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const newLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCaptainLocation(newLocation);
                if (user) {
                    debouncedUpdateLocation(user.uid, newLocation);
                }
            },
            (error) => console.error(error)
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [user, debouncedUpdateLocation]);

    useEffect(() => {
        const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPendingOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribe;
    }, []);

    const handleOrderClick = (orderId) => {
        router.push(`/captain/orders/${orderId}`);
    };

    if (loadError) return <div>Map cannot be loaded.</div>;

    return (
        <Layout>
            <div className="flex h-screen">
                <div className="w-1/2 h-full">
                    {isLoaded && captainLocation ? (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={captainLocation}
                            zoom={15}
                        >
                            {pendingOrders.map(order => (
                                <Marker
                                    key={order.id}
                                    position={order.shippingAddress.location}
                                    onClick={() => handleOrderClick(order.id)}
                                />
                            ))}
                        </GoogleMap>
                    ) : (
                        <p>Loading map...</p>
                    )}
                </div>
                <div className="w-1/2 h-full overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Nearby Orders</h1>
                    <div className="space-y-4">
                        {pendingOrders.map(order => (
                            <OrderCard key={order.id} order={order} onClick={() => handleOrderClick(order.id)} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CaptainHomePage;
