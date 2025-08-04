import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { StoreCard } from '../../components/stores/StoreCard';
import { StoreCardSkeleton } from '../../components/stores/StoreCardSkeleton';

const StorePage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All', 'Grocery', 'Dairy', 'Bakery']);
    const [isNearby, setIsNearby] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'stores'), (snapshot) => {
            const storesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStores(storesData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isNearby) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting user location", error);
                }
            );
        }
    }, [isNearby]);

    const filteredStores = stores
        .filter(store => store.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(store => selectedCategory === 'All' || store.category === selectedCategory)
        .sort((a, b) => {
            if (isNearby && userLocation) {
                const distanceA = getDistance(userLocation, a.location);
                const distanceB = getDistance(userLocation, b.location);
                return distanceA - distanceB;
            }
            return 0;
        });

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <input
                        type="text"
                        placeholder="Search for stores..."
                        className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center bg-gray-200 p-1 rounded-full">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={isNearby}
                                onChange={() => setIsNearby(!isNearby)}
                            />
                            <span className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isNearby ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}>
                                Nearby
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => <StoreCardSkeleton key={i} />)
                    ) : (
                        filteredStores.map(store => <StoreCard key={store.id} store={store} userLocation={userLocation} />)
                    )}
                </div>
            </div>
        </Layout>
    );
};

// Haversine formula to calculate distance
const getDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
};

export default StorePage;
