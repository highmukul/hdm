import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const CategoryGrid = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchCategories();
    }, []);

    return (
        <section className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                    <Link href={`/category/${category.id}`} key={category.id}>
                        <motion.a
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img src={category.imageUrl || '/placeholder.png'} alt={category.name} className="h-20 w-20 object-cover mb-2" />
                            <span className="font-semibold text-center">{category.name}</span>
                        </motion.a>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
