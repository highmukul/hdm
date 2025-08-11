import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import FilterSidebar from '../components/products/FilterSidebar';
import ShopAdBanner from '../components/common/ShopAdBanner';

const ShopPage = () => {
    const [filters, setFilters] = useState({
        category: '',
        sortBy: 'createdAt-desc',
        search: ''
    });

    const { products, loading, error } = useProducts(filters);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </aside>
                    <main className="lg:col-span-3">
                        <ShopAdBanner />
                        {error && <p className="text-red-500">{error.message}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {loading ? (
                                Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
                            ) : (
                                products.map(product => <ProductCard key={product.id} product={product} />)
                            )}
                        </div>
                         {products.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                            </div>
                         )}
                    </main>
                </div>
            </div>
        </Layout>
    );
};

export default ShopPage;
