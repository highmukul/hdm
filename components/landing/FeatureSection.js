import { motion } from 'framer-motion';
import { FaShippingFast, FaLeaf, FaSmileBeam } from 'react-icons/fa';

const features = [
    { icon: <FaShippingFast />, title: "15-Minute Delivery", description: "Why wait? Our captains deliver your order at supersonic speed, so you never have to pause your day." },
    { icon: <FaLeaf />, title: "Farm-to-Table Freshness", description: "We partner with local farms to bring you the freshest produce, ensuring quality you can taste." },
    { icon: <FaSmileBeam />, title: "Service That Delights", description: "Your happiness is our priority. Our team is always here to ensure your experience is perfect." },
];

const FeatureSection = () => {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="grid md:grid-cols-3 gap-12 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants} className="p-6">
                            <div className="text-5xl text-indigo-600 mb-6 mx-auto w-fit">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
