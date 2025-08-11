import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/products/ProductCard';
import ProductCardSkeleton from '../../components/products/ProductCardSkeleton';
import FilterSidebar from '../../components/products/FilterSidebar';
import QuickViewModal from '../../components/products/QuickViewModal';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

interface Store extends DocumentData {
    id: string;
    name: string;
    address: string;
}

interface Product extends DocumentData {
    id: string;
    name: string;
    salePrice: number;
    mrp: number;
    stock: number;
    imageUrls: string[];
    description: string;
}

interface StorePageProps {
    store: Store;
}

const StorePage: NextPage<StorePageProps> = ({ store }) => {
    const router = useRouter();
    const { storeId } = router.query;
    
    const [filters, setFilters] = useState({
        category: '',
        sortBy: 'createdAt-desc',
        search: '',
        priceRange: [0, 10000]
    });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { products, loading, error } = useProducts(filters, storeId as string);
    
    if (router.isFallback) {
        return <Layout><div className="flex justify-center items-center h-screen"><ProductCardSkeleton /></div></Layout>;
    }

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold">{store.name}</h1>
                    <p className="text-lg text-gray-600 mt-2">{store.address}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </div>
                    <div className="lg:col-span-3">
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {loading ? (
                                Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
                            ) : (
                                products.map(product => <ProductCard key={product.id} product={product as Product} onQuickView={handleQuickView} />)
                            )}
                        </div>
                        {products.length === 0 && !loading && <p>No products found in this store.</p>}
                    </div>
                </div>
            </div>
            <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { storeId } = params!;
    const docRef = doc(db, 'stores', storeId as string);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return { notFound: true };
    }

    const store = { id: docSnap.id, ...docSnap.data() };
    const serializableStore = JSON.parse(JSON.stringify(store));

    return {
        props: {
            store: serializableStore,
        },
        revalidate: 60,
    };
}


export default StorePage;
