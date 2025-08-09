import { motion } from 'framer-motion';
import { FiClock, FiBox, FiSmile } from 'react-icons/fi';

const features = [
    { 
        icon: <FiClock />, 
        title: "Superfast Delivery", 
        description: "Get your groceries and essentials delivered in minutes, so you can get back to what matters." 
    },
    { 
        icon: <FiBox />, 
        title: "Wide Product Range", 
        description: "From fresh produce to household items, we have everything you need, all in one place." 
    },
    { 
        icon: <FiSmile />, 
        title: "Reliable Service", 
        description: "Our dedicated team works hard to ensure your order is accurate and delivered with a smile." 
    },
];

const FeatureSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants} 
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="text-4xl text-green-500 mb-5 inline-block">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
