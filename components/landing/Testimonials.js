import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  { name: 'Priya S.', location: 'Mumbai', text: 'Hadoti Daily Mart is a lifesaver! I get my groceries faster than I can decide what to cook.', avatar: '/avatar1.png' },
  { name: 'Rahul K.', location: 'Delhi', text: 'The quality of the fresh produce is unmatched. It feels like its straight from the farm.', avatar: '/avatar2.png' },
  { name: 'Anjali M.', location: 'Bangalore', text: 'As a busy professional, this app saves me so much time. The delivery is always on time!', avatar: '/avatar3.png' },
];

const Testimonials = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-16">Loved by Customers Nationwide</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-50 p-8 rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <p className="text-gray-700 italic mb-6">&quot;{testimonial.text}&quot;</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} />
                                </div>
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
