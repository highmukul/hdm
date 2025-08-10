import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testimonialsRef = collection(db, 'testimonials');
        const unsubscribe = onSnapshot(testimonialsRef, (snapshot) => {
            if (snapshot.empty) {
                // Add sample testimonials if the collection is empty
                addDoc(testimonialsRef, { author: "Sarah L.", text: "The fastest delivery in town! My groceries arrived in under 20 minutes.", rating: 5 });
                addDoc(testimonialsRef, { author: "Michael B.", text: "A wide variety of fresh, organic produce. I love the quality!", rating: 5 });
                addDoc(testimonialsRef, { author: "Jessica P.", text: "Finally, a reliable grocery delivery service in Hadoti. Highly recommend!", rating: 5 });
            } else {
                setTestimonials(snapshot.docs.map(doc => doc.data()));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading testimonials...</div>;
    }

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-lg shadow-lg"
                        >
                            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                            <p className="font-bold text-right">- {testimonial.author}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
