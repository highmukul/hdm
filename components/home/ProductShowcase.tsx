import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../products/ProductCard';
import QuickViewModal from '../products/QuickViewModal';
import { motion } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, getDocs, limit, query, DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import React from 'react';

interface Product extends DocumentData {
    id: string;
    name: string;
    salePrice: number;
    mrp: number;
    stock: number;
    imageUrls: string[];
    description: string;
}

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, limit(10));
        const productsSnapshot = await getDocs(q);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
      setSelectedProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Featured Products</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} onQuickView={handleQuickView} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>
        <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default ProductShowcase;
