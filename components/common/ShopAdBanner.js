import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

const ShopAdBanner = () => {
    const [ad, setAd] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const bannersRef = collection(db, 'banners');
                const q = query(
                    bannersRef,
                    where('location', '==', 'shop-ad-top'),
                    orderBy('createdAt', 'desc'),
                    limit(1)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setAd({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
                }
            } catch (error) {
                console.error("Error fetching shop ad:", error);
            }
        };
        fetchAd();
    }, []);

    if (!ad) {
        return null;
    }

    const adContent = (
        <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
                src={ad.imageUrl}
                alt={ad.title || 'Advertisement'}
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold text-center drop-shadow-md">{ad.title}</h3>
            </div>
        </div>
    );

    return (
        <div className="mb-8">
            {ad.linkUrl ? (
                <Link href={ad.linkUrl} legacyBehavior>
                    <a aria-label={ad.title}>{adContent}</a>
                </Link>
            ) : (
                adContent
            )}
        </div>
    );
};

export default ShopAdBanner;
