import Layout from '../../components/layout/Layout';
import StoreCard from '../../components/stores/StoreCard';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const StoresPage = ({ stores }) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Nearby Stores</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.map(store => (
                        <StoreCard key={store.id} store={store} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    if (process.env.npm_lifecycle_event === 'build') {
        return {
            props: {
                stores: [],
            },
        };
    }

    const storesRef = collection(db, 'stores');
    const storeSnap = await getDocs(storesRef);
    const stores = storeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
        props: {
            stores: JSON.parse(JSON.stringify(stores)),
        },
        revalidate: 60,
    };
}

export default StoresPage;
