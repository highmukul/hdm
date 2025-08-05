import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { FilterSidebar } from './FilterSidebar';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        brands: [],
        categories: [],
        sortBy: 'popularity',
    });

    useEffect(() => {
        // This is a simplified query. In a real app, you'd apply filters to the query.
        const q = query(
            collection(db, 'products'), // Assuming a top-level products collection for now
            orderBy(filters.sortBy, 'desc'),
            limit(20)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return unsubscribe;
    }, [filters]);

    return (
        <div className="flex">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
            <main className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    ) : (
                        products.map(product => <ProductCard key={product.id} product={product} />)
                    )}
                </div>
                {/* Infinite scroll loader would go here */}
            </main>
        </div>
    );
};

export default ProductGrid;
