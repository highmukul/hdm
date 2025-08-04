import { useRouter } from 'next/router';
import { useProducts } from '../hooks/useProducts';
import Layout from '../components/layout/Layout';
import  ProductCard  from '../components/products/ProductCard';
import  ProductSkeleton  from '../components/products/ProductSkeleton';

const SearchPage = () => {
    const router = useRouter();
    const { q } = router.query;
    const { products, loading } = useProducts();

    const searchResults = products.filter(p => 
        q ? p.name.toLowerCase().includes(q.toLowerCase()) : false
    );

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8">Searching...</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-8">
                            {searchResults.length > 0 
                                ? `Showing ${searchResults.length} results for "${q}"`
                                : `No results found for "${q}"`
                            }
                        </h1>
                        {searchResults.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {searchResults.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default SearchPage;
