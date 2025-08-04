import ProductCard from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRef } from 'react';

const ProductCarousel = ({ title, products, loading }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Scroll right"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            >
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div className="flex-shrink-0 w-48 md:w-56" key={i}>
                            <ProductSkeleton />
                        </div>
                    ))
                ) : (
                    products.map(product => (
                        <div className="flex-shrink-0 w-48 md:w-56" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;
