import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../products/ProductCard';

const ProductShowcase = () => {
  const { products, loading, error } = useProducts({ limit: 8 }); // Fetch 8 products for the showcase

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        {loading && <div className="text-center">Loading products...</div>}
        {error && <div className="text-center text-red-500">Could not load products.</div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;