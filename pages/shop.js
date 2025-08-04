import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useProducts } from '../hooks/useProducts';

const ShopPage = () => {
    const { products, loading: productsLoading } = useProducts();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
            const fetchedCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories([{ id: 'All', name: 'All' }, ...fetchedCategories]);
            setLoadingCategories(false);
        });
        return unsubscribe;
    }, []);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <aside className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    {loadingCategories ? <p>Loading categories...</p> : (
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                        selectedCategory === category.name
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </aside>

                <main>
                    <ProductGrid products={filteredProducts} loading={productsLoading} />
                </main>
            </div>
        </Layout>
    );
};

export default ShopPage;
