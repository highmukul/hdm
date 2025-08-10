import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import * as FaIcons from 'react-icons/fa';

SwiperCore.use([Pagination, Navigation, Autoplay]);

export const ProductImageCarousel = ({ images }) => {
    return (
        <div className="relative">
            <Swiper
                pagination={{ type: 'fraction' }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Product image ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev-custom absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75">
                <FaIcons.FaChevronLeft />
            </div>
            <div className="swiper-button-next-custom absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75">
                <FaIcons.FaChevronRight />
            </div>
        </div>
    );
};
