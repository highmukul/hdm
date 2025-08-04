import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const LandingHero = () => {
    return (
        <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white text-gray-800 py-20 md:py-32">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Groceries at Lightning Speed.
                        <br />
                        <span className="text-indigo-600">Right to Your Door.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                        Experience the future of grocery shopping with Hadoti Daily Mart. Get fresh produce, daily essentials, and your favorite snacks delivered in minutes.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Link href="/shop">
                            <a className="btn-primary text-lg px-8 py-4">Explore Store</a>
                        </Link>
                        <Link href="/signup">
                            <a className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                Create Account
                            </a>
                        </Link>
                    </div>
                </motion.div>

                {/* Image Content with Animation */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Image 
                        src="/hero-image.png" // You'll need to add a hero image here
                        alt="Grocery Delivery"
                        width={600}
                        height={500}
                        objectFit="contain"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default LandingHero;
