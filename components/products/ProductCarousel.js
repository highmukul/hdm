import ProductCard from './ProductCard';
import { ProductSkeleton } from '../common/components';

const ProductCarousel = ({ title, products, loading }) => {
    return (
        <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">{title}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div className="flex-shrink-0 w-full sm:w-64" key={i}>
                            <ProductSkeleton />
                        </div>
                    ))
                ) : (
                    products.map(product => (
                        <div className="flex-shrink-0 w-full sm:w-64" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;
