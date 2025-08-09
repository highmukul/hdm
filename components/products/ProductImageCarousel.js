import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ProductImageCarousel = ({ images }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
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
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
