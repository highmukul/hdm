import { motion } from 'framer-motion';
import { FiSearch, FiShoppingBag, FiGift } from 'react-icons/fi';

const steps = [
  { 
    icon: <FiSearch />, 
    title: 'Find What You Need', 
    description: 'Browse thousands of products from local stores, all in one place.' 
  },
  { 
    icon: <FiShoppingBag />, 
    title: 'Place Your Order', 
    description: 'Add items to your cart and check out in seconds. It\'s that easy.' 
  },
  { 
    icon: <FiGift />, 
    title: 'Enjoy Fast Delivery', 
    description: 'Our delivery partners will bring your order right to your door in minutes.' 
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Getting your favorites delivered has never been easier.
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-10 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/3 left-0 w-full h-0.5 bg-gray-200" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative z-10"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-gray-200 text-green-500 text-4xl rounded-full mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500 px-4">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
