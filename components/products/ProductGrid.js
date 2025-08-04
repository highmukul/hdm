import { useState } from 'react';
import ProductCard from '../products/ProductCard';
import { ProductSkeleton } from '../common/components';

const ProductGrid = ({ filters, initialProducts, initialLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedProducts = initialProducts
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => filters.category === 'All' || p.category === filters.category)
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Search within our products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 mb-8 border-2 border-border rounded-lg bg-card-background text-text-primary focus:ring-primary focus:border-primary"
      />
      {initialLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 card">
            <p className="text-text-secondary">No products found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
