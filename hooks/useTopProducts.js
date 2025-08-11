import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const useTopProducts = (dateRange) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopProducts = async () => {
            if (!dateRange.startDate || !dateRange.endDate) return;

            setLoading(true);
            setError(null);

            try {
                // 1. Fetch orders within the date range
                const ordersQuery = query(
                    collection(db, 'orders'),
                    where('createdAt', '>=', dateRange.startDate),
                    where('createdAt', '<=', dateRange.endDate)
                );
                const ordersSnapshot = await getDocs(ordersQuery);

                // 2. Aggregate product sales from orders
                const productSales = {};
                ordersSnapshot.docs.forEach(orderDoc => {
                    const orderItems = orderDoc.data().items || [];
                    orderItems.forEach(item => {
                        productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
                    });
                });

                // 3. Sort products by sales count and get the top 5
                const topProductIds = Object.keys(productSales)
                    .sort((a, b) => productSales[b] - productSales[a])
                    .slice(0, 5);

                if (topProductIds.length === 0) {
                    setProducts([]);
                    setLoading(false);
                    return;
                }

                // 4. Fetch the details for the top products
                const productPromises = topProductIds.map(productId => getDoc(doc(db, 'products', productId)));
                const productSnapshots = await Promise.all(productPromises);
                
                const topProducts = productSnapshots.map(productDoc => {
                    if (productDoc.exists()) {
                        return { 
                            id: productDoc.id, 
                            ...productDoc.data(),
                            sales: productSales[productDoc.id] // Add the calculated sales count
                        };
                    }
                    return null;
                }).filter(p => p !== null);

                setProducts(topProducts);

            } catch (err) {
                setError(err);
                console.error("Error fetching top products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, [dateRange]);

    return { products, loading, error };
};

export default useTopProducts;
