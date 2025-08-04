import ProductCard from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
        <p className="text-gray-500 mt-2">There are no products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
