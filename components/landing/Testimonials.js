import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  { 
    name: 'Priya S.', 
    location: 'Mumbai', 
    text: 'This app is a game-changer! Superfast delivery and the freshest produce I\'ve seen.', 
    avatar: '/avatar1.png',
    rating: 5
  },
  { 
    name: 'Rahul K.', 
    location: 'Delhi', 
    text: 'I love how easy it is to order. The app is intuitive and the service is always reliable.', 
    avatar: '/avatar2.png',
    rating: 5
  },
  { 
    name: 'Anjali M.', 
    location: 'Bangalore', 
    text: 'The 24/7 availability is perfect for my busy schedule. Highly recommend!', 
    avatar: '/avatar3.png',
    rating: 4
  },
];

const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-50 p-8 rounded-xl shadow-sm transition-shadow hover:shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                                    <Image src={testimonial.avatar} alt={testimonial.name} width={56} height={56} />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{testimonial.text}</p>
                            <StarRating rating={testimonial.rating} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
