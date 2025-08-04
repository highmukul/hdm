import { motion } from 'framer-motion';
import Link from 'next/link';

const CtaSection = () => {
    return (
        <section className="bg-indigo-600 text-white">
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
                        Join thousands of happy customers and get your essentials delivered in minutes.
                    </p>
                    <Link href="/shop">
                        <a className="bg-white text-indigo-600 text-lg font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105 inline-block">
                            Start Shopping Now
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;
