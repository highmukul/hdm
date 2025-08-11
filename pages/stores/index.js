import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import StoreCard from '../../components/stores/StoreCard';
import StoreCardSkeleton from '../../components/stores/StoreCardSkeleton';

const StoresPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            const snapshot = await getDocs(collection(db, 'stores'));
            setStores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        };
        fetchStores();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-12">Our Stores</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => <StoreCardSkeleton key={i} />)
                    ) : (
                        stores.map(store => <StoreCard key={store.id} store={store} />)
                    )}
                </div>
                {stores.length === 0 && !loading && <p>No stores found.</p>}
            </div>
        </Layout>
    );
};

export default StoresPage;
