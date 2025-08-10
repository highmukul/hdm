import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useCaptainLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation = { lat: latitude, lng: longitude };
                    setLocation(newLocation);
                    if (user) {
                        setDoc(doc(db, 'captains', user.uid), { location: newLocation }, { merge: true });
                    }
                },
                (err) => {
                    setError(err.message);
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [user]);

    return { location, error };
};
