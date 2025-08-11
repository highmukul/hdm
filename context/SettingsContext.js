import { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const SettingsContext = createContext();

const initialSettings = {
    platformFee: {
        isEnabled: true,
        amount: 2.00,
    },
    deliveryFee: {
        freeFrom: 500,
        charge: 30,
    },
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const settingsRef = doc(db, 'settings', 'config');
        const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
            if (docSnap.exists()) {
                setSettings(docSnap.data());
            } else {
                // If no settings doc exists, create one with initial settings
                setDoc(settingsRef, initialSettings);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateSettings = async (newSettings) => {
        const settingsRef = doc(db, 'settings', 'config');
        await setDoc(settingsRef, newSettings, { merge: true });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
