import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

interface Promotion extends DocumentData {
    id: string;
    title: string;
    imageUrl: string;
    link?: string;
}

const Hero: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const promotionsCollection = collection(db, 'promotions');
                const promotionsSnapshot = await getDocs(promotionsCollection);
                const promotionsList = promotionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion));
                setPromotions(promotionsList);
            } catch (error) {
                console.error("Error fetching promotions: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
        }
    };

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
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <form onSubmit={handleSearch} className="w-full max-w-lg">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-4 pl-12 text-lg rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search for products..."
                            aria-label="Search for products"
                        />
                        <button type="submit" className="absolute left-0 top-0 mt-4 ml-4" aria-label="Submit search">
                            <SearchIcon className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Hero;
