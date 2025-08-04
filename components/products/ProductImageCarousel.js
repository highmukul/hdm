import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Lazy } from 'swiper';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/lazy';

export const ProductImageCarousel = ({ images }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Lazy]}
            navigation
            pagination={{ clickable: true }}
            lazy
            className="w-full rounded-lg"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-96 relative">
                        <Image
                            src={image}
                            alt={`Product image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="swiper-lazy"
                        />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
