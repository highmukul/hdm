import { motion } from 'framer-motion';
import Link from 'next/link';

const JoinCaptain = () => {
  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-4"
        >
            Want to Earn on Your Schedule?
        </motion.h2>
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mb-8 max-w-xl mx-auto"
        >
            Join our team of delivery captains and earn money by delivering groceries to people in your city.
        </motion.p>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Link href="/signup">
                <a className="bg-white text-primary text-lg font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 inline-block">
                Register as a Captain
                </a>
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCaptain;