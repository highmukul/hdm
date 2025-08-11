import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannersRef = collection(db, 'banners');
                const q = query(
                    bannersRef, 
                    where('location', '==', 'hero-carousel'),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(q);
                const bannerSlides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSlides(bannerSlides);
            } catch (error) {
                console.error("Error fetching hero banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading) {
        return <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg animate-pulse"></div>;
    }
    
    if (slides.length === 0) {
        return null; // Don't render the carousel if there are no slides
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full rounded-lg mb-8"
            loop={slides.length > 1}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <Link href={slide.linkUrl || '#'} legacyBehavior>
                        <a className="block relative h-64 md:h-96">
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title || 'Promotional banner'}
                                layout="fill"
                                objectFit="cover"
                                priority={true} // Prioritize loading the first image
                            />
                            {slide.title && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 flex flex-col justify-end p-8">
                                    <h2 className="text-3xl font-bold text-white mb-2">{slide.title}</h2>
                                </div>
                            )}
                        </a>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
