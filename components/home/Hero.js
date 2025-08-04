import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800"
        >
          Your Groceries, <span className="text-primary">Delivered Fast.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Fresh produce, pantry staples, and household essentials delivered from your favorite local stores right to your door.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Link href="/home">
            <a className="bg-primary text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-primary-dark transition duration-300 transform hover:scale-105 inline-block">
              Start Shopping Now
            </a>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;