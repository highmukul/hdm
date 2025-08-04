import { motion } from 'framer-motion';
import Link from 'next/link';

const CtaSection = () => {
    return (
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Daily Needs, Delivered in Minutes</h2>
                    <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                        From groceries to essentials, get everything you need delivered to your doorstep, day or night.
                    </p>
                    <Link href="/shop">
                        <a className="bg-white text-green-600 text-lg font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105 inline-block shadow-lg">
                            Place Your First Order
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;
