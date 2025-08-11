import { useProducts } from '../../hooks/useProducts';
import ProductCard, { Product } from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DocumentData } from 'firebase/firestore';
import React from 'react';

interface RelatedProductsProps {
    categoryId: string;
    currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId, currentProductId }) => {
    const { products, loading } = useProducts({ category: categoryId });

    const related = products.filter(p => p.id !== currentProductId);

    if (loading || related.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <Swiper spaceBetween={30} slidesPerView={4}>
                {related.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product as Product} onQuickView={() => {}} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default RelatedProducts;
