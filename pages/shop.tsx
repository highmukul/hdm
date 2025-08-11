import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useProducts } from '../hooks/useProducts';
import ProductCard, { Product } from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import FilterSidebar from '../components/products/FilterSidebar';
import ShopAdBanner from '../components/common/ShopAdBanner';
import QuickViewModal from '../components/products/QuickViewModal';
import { DocumentData } from 'firebase/firestore';
import { NextPage } from 'next';
import React from 'react';

const ShopPage: NextPage = () => {
    const [filters, setFilters] = useState({
        category: '',
        sortBy: 'createdAt-desc',
        search: '',
        priceRange: [0, 10000]
    });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { products, loading, error, loadMore, hasMore } = useProducts(filters);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </aside>
                    <main className="lg:col-span-3">
                        <ShopAdBanner />
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(product => <ProductCard key={product.id} product={product as Product} onQuickView={handleQuickView} />)}
                            {loading && Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                        </div>
                        {products.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                            </div>
                        )}
                        {hasMore && !loading && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={loadMore}
                                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
        </Layout>
    );
};

export default ShopPage;
