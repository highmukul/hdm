import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import ProductCard from './ProductCard';
import * as FiIcons from 'react-icons/fi';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const ProductCarousel = ({ products }) => {
    return (
        <div className="relative">
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md cursor-pointer">
                <FiIcons.FiChevronLeft size={24} />
            </div>
            <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md cursor-pointer">
                <FiIcons.FiChevronRight size={24} />
            </div>
        </div>
    );
};

export default ProductCarousel;
