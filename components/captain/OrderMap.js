import { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { useAuth } from '../../context/AuthContext';
import { useCaptain } from '../../hooks/useCaptain';
import { useAvailableOrders } from '../../hooks/useAvailableOrders';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FiNavigation, FiX } from 'react-icons/fi';
import OrderCard from './OrderCard';

const mapContainerStyle = { width: '100%', height: 'calc(100vh - 200px)', borderRadius: '1.5rem' };

const OrderMap = () => {
    const { user } = useAuth();
    const { location, assignedOrder } = useCaptain(user?.uid);
    const { orders, loading } = useAvailableOrders();
    const { isLoaded, loadError } = useGoogleMaps();
    const mapRef = useRef(null);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [directions, setDirections] = useState(null);

    // Calculate directions for the assigned order
    useEffect(() => {
        if (!assignedOrder || !isLoaded || !location) {
            setDirections(null);
            return;
        }
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin: new window.google.maps.LatLng(location.lat, location.lng),
            destination: new window.google.maps.LatLng(assignedOrder.shippingAddress.location.lat, assignedOrder.shippingAddress.location.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }, [assignedOrder, isLoaded, location]);

    const handleAcceptOrder = async (order) => {
        try {
            await updateDoc(doc(db, 'orders', order.id), {
                status: 'Accepted',
                captainId: user.uid,
            });
            toast.success('Order accepted! Starting route...');
            setSelectedOrder(null);
        } catch (error) {
            toast.error('Failed to accept order.');
        }
    };

    if (loadError) return <div className="text-red-500">Map cannot be loaded. Please check your internet connection and API key.</div>;
    if (!isLoaded || loading || !location) return <div className="h-full flex items-center justify-center"><p>Loading map and orders...</p></div>;

    return (
        <div className="relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: location.lat, lng: location.lng }}
                zoom={14}
                options={{ disableDefaultUI: true, gestureHandling: 'cooperative' }}
                onLoad={ref => mapRef.current = ref}
            >
                {/* Captain's Location Marker */}
                <Marker position={{ lat: location.lat, lng: location.lng }} icon={{ url: '/bike.svg', scaledSize: new window.google.maps.Size(40, 40) }} />

                {/* Markers for Available Orders */}
                {!assignedOrder && orders.map(order => (
                    <Marker
                        key={order.id}
                        position={order.shippingAddress.location}
                        onClick={() => setSelectedOrder(order)}
                    />
                ))}

                {/* Directions for Assigned Order */}
                {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: '#1a73e8', strokeWeight: 6 } }} />}

                {/* InfoWindow for Selected Order */}
                {selectedOrder && (
                    <InfoWindow
                        position={selectedOrder.shippingAddress.location}
                        onCloseClick={() => setSelectedOrder(null)}
                    >
                        <div className="p-2 max-w-xs">
                            <h4 className="font-bold">Order #{selectedOrder.id.substring(0, 6)}</h4>
                            <p className="text-sm">Deliver to: {selectedOrder.shippingAddress.fullAddress}</p>
                            <p className="text-sm font-semibold">Earnings: ₹{selectedOrder.deliveryFee || '25'}</p>
                            <button
                                onClick={() => handleAcceptOrder(selectedOrder)}
                                className="mt-2 w-full bg-blue-600 text-white text-sm font-semibold py-1.5 px-3 rounded-lg"
                            >
                                Accept Order
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>

            {/* Recenter Button */}
            <button
                onClick={() => mapRef.current?.panTo({ lat: location.lat, lng: location.lng })}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
                aria-label="Recenter map"
            >
                <FiNavigation className="text-gray-700" />
            </button>

            {/* Active Order Panel */}
            {assignedOrder && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <OrderCard order={assignedOrder} isAssigned={true} />
                </div>
            )}
        </div>
    );
};

export default OrderMap;
