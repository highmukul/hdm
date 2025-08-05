import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy, limit, startAfter } from 'firebase/firestore';
import ProductCard from '../../components/products/ProductCard';
import { ProductCardSkeleton } from '../../components/products/ProductCardSkeleton';

const ProductListPage = () => {
    const router = useRouter();
    const { storeId } = router.query;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name_asc');
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchProducts = useCallback((l = 10) => {
        if (!storeId || !hasMore) return;
        setLoading(true);

        let q = query(
            collection(db, 'stores', storeId, 'products'),
            orderBy(sortBy.split('_')[0], sortBy.split('_')[1]),
            limit(l)
        );

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(prev => lastDoc ? [...prev, ...newProducts] : newProducts);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(newProducts.length === l);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching products:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [storeId, sortBy, lastDoc, hasMore]);


    useEffect(() => {
        const unsubscribe = fetchProducts();
        return () => unsubscribe && unsubscribe();
    }, [fetchProducts]);

    const lastProductElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchProducts();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchProducts]);


    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setProducts([]);
        setLastDoc(null);
        setHasMore(true);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <select
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onChange={handleSortChange}
                        value={sortBy}
                    >
                        <option value="name_asc">Sort by Name (A-Z)</option>
                        <option value="name_desc">Sort by Name (Z-A)</option>
                        <option value="price_asc">Sort by Price (Low-High)</option>
                        <option value="price_desc">Sort by Price (High-Low)</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        if (products.length === index + 1) {
                            return <div ref={lastProductElementRef} key={product.id}><ProductCard product={product} /></div>;
                        } else {
                            return <ProductCard key={product.id} product={product} />;
                        }
                    })}
                    {loading && Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
            </div>
        </Layout>
    );
};

export default ProductListPage;
