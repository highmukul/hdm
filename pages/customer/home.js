import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { BottomNav } from '../../components/layout/BottomNav';
import { useRouter } from 'next/router';

const CustomerHomePage = () => {
    const { isLoaded, loadError } = useGoogleMaps();
    const [userLocation, setUserLocation] = useState(null);
    const [stores, setStores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error(error)
        );

        const unsubscribe = onSnapshot(collection(db, 'stores'), (snapshot) => {
            setStores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribe;
    }, []);

    const handleMarkerClick = (storeId) => {
        router.push(`/stores/${storeId}`);
    };

    if (loadError) return <div>Map cannot be loaded.</div>;

    return (
        <Layout>
            <div className="relative h-screen">
                {isLoaded && userLocation ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={userLocation}
                        zoom={15}
                    >
                        {stores.map(store => (
                            <Marker
                                key={store.id}
                                position={store.location}
                                onClick={() => handleMarkerClick(store.id)}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading map...</p>
                    </div>
                )}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
                    <input
                        type="text"
                        placeholder="Search for products or stores"
                        className="w-full p-4 rounded-full shadow-lg"
                    />
                </div>
            </div>
            <BottomNav />
        </Layout>
    );
};

export default CustomerHomePage;
