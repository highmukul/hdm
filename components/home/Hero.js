import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

const mockPromotions = [
    {
        id: '1',
        title: 'Summer Sale',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/hadoti-daily-mart-467808.appspot.com/o/1715878953938-Summer-Sale-Web-Banner.jpg?alt=media&token=16a9539a-7c59-42b7-8730-e3009d3b45e9',
        link: '/shop',
    },
    {
        id: '2',
        title: 'New Arrivals',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/hadoti-daily-mart-467808.appspot.com/o/1715878953938-Summer-Sale-Web-Banner.jpg?alt=media&token=16a9539a-7c59-42b7-8730-e3009d3b45e9',
        link: '/shop',
    },
];

const Hero = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPromotions(mockPromotions);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>;
    }

    return (
        <section className="relative h-64 md:h-96">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {promotions.map(promo => (
                    <SwiperSlide key={promo.id}>
                        <Link href={promo.link || '#'} className="block h-full">
                                <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;
