import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as FiIcons from 'react-icons/fi';

const SearchPage = () => {
    const router = useRouter();
    const { q } = router.query;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!q) {
            setLoading(false);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const productsRef = collection(db, 'products');
                // This is a basic search. For production, consider a dedicated search service like Algolia.
                const searchQuery = query(productsRef, where('name', '>=', q), where('name', '<=', q + '\uf8ff'));
                const querySnapshot = await getDocs(searchQuery);
                const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setResults(searchResults);
            } catch (error) {
                console.error("Error fetching search results: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [q]);

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Search results for &quot;{q}&quot;
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <FiIcons.FiLoader className="animate-spin text-4xl text-green-500" />
                    </div>
                ) : results.length > 0 ? (
                    <ProductGrid products={results} />
                ) : (
                    <div className="text-center py-16">
                        <FiIcons.FiSearch className="mx-auto text-6xl text-gray-400 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
                        <p className="text-gray-500">Try a different search term or browse our categories.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SearchPage;
