import { motion } from 'framer-motion';
import { FaMousePointer, FaShoppingBag, FaBicycle } from 'react-icons/fa';

const steps = [
  { icon: <FaMousePointer />, title: 'Browse & Select', description: 'Explore thousands of products and add your favorites to your cart.' },
  { icon: <FaShoppingBag />, title: 'Place Your Order', description: 'Confirm your order and our team instantly starts packing your items.' },
  { icon: <FaBicycle />, title: 'Get It Delivered', description: 'A delivery captain picks up your order and brings it to you in minutes.' },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-16">Three Simple Steps</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Dotted Line Connector */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -mt-4">
              <svg width="100%" height="100%"><line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" stroke="rgb(209,213,219)" strokeDasharray="8, 8"/></svg>
          </div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white p-8 rounded-2xl shadow-lg z-10"
            >
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-indigo-600 text-white text-4xl rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
