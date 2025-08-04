import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const useCaptain = () => {
    const { user } = useAuth();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newLocation = { lat: latitude, lng: longitude };
                setLocation(newLocation);

                if (user) {
                    const captainRef = doc(db, 'captains', user.uid);
                    updateDoc(captainRef, {
                        location: newLocation,
                        updatedAt: serverTimestamp(),
                    });
                }
            },
            (error) => console.error("Geolocation Error:", error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [user]);

    return { location };
};
