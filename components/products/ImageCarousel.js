import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarousel = ({ imageUrls }) => {
    const [index, setIndex] = useState(0);

    const nextImage = () => setIndex(i => (i + 1) % imageUrls.length);
    const prevImage = () => setIndex(i => (i - 1 + imageUrls.length) % imageUrls.length);

    return (
        <div className="relative w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={index}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute w-full h-full"
                >
                    <Image
                        src={imageUrls[index]}
                        alt="Product Image"
                        layout="fill"
                        objectFit="contain"
                    />
                </motion.div>
            </AnimatePresence>
            
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-10"><FaChevronLeft /></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-10"><FaChevronRight /></button>

            <div className="absolute bottom-4 flex space-x-2 z-10">
                {imageUrls.map((_, i) => (
                    <div key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${i === index ? 'bg-indigo-600' : 'bg-gray-400'}`} />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
