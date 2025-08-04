import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import ProductCarousel from '../components/products/ProductCarousel';
import FilterSidebar from '../components/products/FilterSidebar';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { FaFilter } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const ShopPage = () => {
  const [filters, setFilters] = useState({ category: 'All', sortBy: 'default' });
  const { products, loading } = useProducts();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const freshProducts = products.slice(0, 8); 
  const trendingProducts = products.slice(8, 16);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 space-y-8">
            <ProductCarousel title="Today's Fresh Products" products={freshProducts} loading={loading} />
            <ProductCarousel title="Trending Near You" products={trendingProducts} loading={loading} />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
                <div className="hidden md:block sticky top-24">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>
                <div className="md:hidden mb-6 text-right">
                    <button onClick={() => setIsFilterOpen(true)} className="btn-primary inline-flex items-center">
                        <FaFilter className="mr-2"/> Filters & Sort
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                        onClick={() => setIsFilterOpen(false)}
                    >
                        <motion.div 
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full bg-card-background w-full max-w-sm p-6 z-50 overflow-y-auto" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FilterSidebar filters={filters} setFilters={setFilters} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 w-full">
                <h2 className="text-3xl font-bold mb-6 text-text-primary">All Products</h2>
                <ProductGrid filters={filters} initialProducts={products} initialLoading={loading} />
            </main>
        </div>
      </div>
    </Layout>
  );
};
export default ShopPage;
