import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export const ProductImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex md:flex-col gap-2">
                    {images.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 relative rounded-lg overflow-hidden cursor-pointer border-2 hover:border-indigo-500" onClick={() => setMainImage(img)}>
                            <Image src={img} alt={`thumbnail ${idx}`} layout="fill" objectFit="cover" />
                        </div>
                    ))}
                </div>
                <div className="relative w-full h-96 flex-1 cursor-pointer" onClick={() => setIsOpen(true)}>
                    <Image src={mainImage} alt="main product" layout="fill" objectFit="contain" className="rounded-lg" />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <Image src={mainImage} alt="main product zoomed" layout="fill" objectFit="contain" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
