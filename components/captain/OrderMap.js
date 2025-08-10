import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

const OrderMap = ({ orders }) => {
    const mapRef = useRef(null);
    const { map, infoWindow } = useGoogleMaps(mapRef);

    useEffect(() => {
        if (map && orders.length > 0) {
            orders.forEach(order => {
                const marker = new window.google.maps.Marker({
                    position: order.shippingAddress.location,
                    map: map,
                    title: order.id,
                });

                marker.addListener('click', () => {
                    infoWindow.setContent(`
                        <div>
                            <h3>Order #${order.id.substring(0, 6)}</h3>
                            <p>To: ${order.customerName}</p>
                            <p>Items: ${order.items.length}</p>
                        </div>
                    `);
                    infoWindow.open(map, marker);
                });
            });
        }
    }, [map, orders, infoWindow]);

    return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />;
};

export default OrderMap;
