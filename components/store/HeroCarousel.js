import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Lazy } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/lazy';

const slides = [
    {
        image: '/promo-1.jpg',
        headline: 'Fresh Atta at 8% Off!',
        subhead: 'Order with friends & save more',
    },
    {
        image: '/promo-2.jpg',
        headline: 'Daily Essentials Delivered Fast',
        subhead: 'Get everything you need, right at your doorstep',
    },
    {
        image: '/promo-3.jpg',
        headline: 'Festive Deals on Sweets & Snacks',
        subhead: 'Celebrate with our special offers',
    },
];

export const HeroCarousel = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, Lazy]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            lazy
            className="w-full rounded-lg mb-8"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="relative h-64 md:h-96">
                        <Image
                            src={slide.image}
                            alt={slide.headline}
                            layout="fill"
                            objectFit="cover"
                            className="swiper-lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-3xl font-bold mb-2 text-center">{slide.headline}</h2>
                            <p className="text-lg mb-4 text-center">{slide.subhead}</p>
                            <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
