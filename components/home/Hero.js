import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

const Hero = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'promotions'), (snapshot) => {
            setPromotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return <div className="h-64 bg-gray-200 animate-pulse"></div>;
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
                        <Link href={promo.link || '#'}>
                            <a className="block h-full">
                                <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover" />
                            </a>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;
