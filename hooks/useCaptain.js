import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const useCaptains = () => {
    const [captains, setCaptains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'captains'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCaptains(list);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return { captains, loading, error };
};

export default useCaptains;
