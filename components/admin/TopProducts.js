import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion } from 'framer-motion';

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, orderBy('sales', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);
            setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        };

        fetchTopProducts();
    }, []);

    if (loading) {
        return <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex justify-center items-center">Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Selling Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} className="flex justify-between items-center py-2 border-b">
                        <span>{product.name}</span>
                        <span className="font-bold">{product.sales} units sold</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default TopProducts;
