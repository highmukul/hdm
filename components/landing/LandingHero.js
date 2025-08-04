import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const animatedTexts = [
  "Groceries delivered in minutes.",
  "Fresh produce at your fingertips.",
  "Late-night cravings sorted.",
  "Your favorite snacks, delivered."
];

const LandingHero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white text-gray-800 py-20 md:py-28">
      <div className="container mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
        {/* Text, Search, and Animation */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <div className="relative h-16 mb-6">
              {animatedTexts.map((text, index) => (
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 20, position: 'absolute' }}
                  animate={{ opacity: index === currentTextIndex ? 1 : 0, y: index === currentTextIndex ? 0 : -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-4xl md:text-5xl font-bold leading-tight"
                >
                  {text}
                </motion.h1>
              ))}
            </div>
            <p className="text-lg text-gray-500 mb-8">
              Your one-stop shop for fresh groceries, daily essentials, and more.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-4 pl-6 pr-24 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
            />
            <Link href="/shop" passHref>
              <a className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-green-600 transition-colors">
                Search
              </a>
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <div className="hidden md:block md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="/hero-image-blinkit.png"
              alt="Fast Grocery Delivery"
              width={500}
              height={500}
              objectFit="contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;