import CaptainLayout from '../../components/captain/CaptainLayout';
import { useCaptainLocation } from '../../hooks/useCaptainLocation';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import React, { useRef, useEffect } from 'react';

const TrackPage = () => {
    const { location, error } = useCaptainLocation();
    const mapRef = useRef(null);
    const { map } = useGoogleMaps(mapRef);
    const markerRef = useRef(null);

    useEffect(() => {
        if (map && location) {
            if (markerRef.current) {
                markerRef.current.setPosition(location);
            } else {
                markerRef.current = new window.google.maps.Marker({
                    position: location,
                    map: map,
                    title: "My Location"
                });
            }
            map.panTo(location);
        }
    }, [map, location]);

    return (
        <CaptainLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Track My Location</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
            </div>
        </CaptainLayout>
    );
};

export default TrackPage;
