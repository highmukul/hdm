import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const useAdminData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
            try {
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(list);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [collectionName]);

    return { data, loading, error };
};

export default useAdminData;
