import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const JoinCaptain = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image 
                            src="/delivery-captain.png" // Placeholder image - you'll need to add this
                            alt="Delivery Captain on a scooter"
                            width={500}
                            height={500}
                            objectFit="contain"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-extrabold mb-4">Be Your Own Boss</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Join our fleet of Delivery Captains and earn on your own schedule. With flexible hours, competitive pay, and a supportive community, Hadoti Daily Mart is the best platform to kickstart your journey.
                        </p>
                        <Link href="/captain/signup">
                            <a className="btn-primary text-lg px-8 py-4 inline-block transform hover:scale-105 transition-transform">
                                Ride With Us
                            </a>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default JoinCaptain;
