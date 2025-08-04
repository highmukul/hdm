import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const JoinCaptain = () => {
    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Earn on Your Own Terms</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Become a delivery partner with us and enjoy the freedom to work on your schedule. Whether you're looking for a full-time or part-time opportunity, you can be your own boss and start earning today.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">&#10003;</span> Flexible Hours
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">&#10003;</span> Competitive Earnings
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">&#10003;</span> Weekly Payments
                            </li>
                        </ul>
                        <Link href="/captain/signup">
                            <a className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition-colors text-lg inline-block">
                                Start Earning
                            </a>
                        </Link>
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Image 
                            src="/join-captain-image.png"
                            alt="Delivery partner with a package"
                            width={550}
                            height={500}
                            objectFit="contain"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default JoinCaptain;
