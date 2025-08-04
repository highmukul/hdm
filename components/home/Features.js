import { motion } from 'framer-motion';
import { FaLeaf, FaShippingFast, FaSmile } from 'react-icons/fa';

const features = [
  { icon: <FaLeaf className="w-10 h-10 mx-auto text-primary" />, title: "Fresh & Quality", desc: "We source the freshest products from trusted local partners." },
  { icon: <FaShippingFast className="w-10 h-10 mx-auto text-primary" />, title: "Speedy Delivery", desc: "Get your order in as fast as one hour, tracked in real-time." },
  { icon: <FaSmile className="w-10 h-10 mx-auto text-primary" />, title: "Happy Customers", desc: "Dedicated support and satisfaction guaranteed for every order." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants} className="p-6">
            {feature.icon}
            <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;