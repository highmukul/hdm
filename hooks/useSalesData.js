import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const useSalesData = (days = 30) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const now = new Date();
                const pastDate = new Date();
                pastDate.setDate(now.getDate() - days);
                const pastTimestamp = Timestamp.fromDate(pastDate);

                const ordersCollection = collection(db, 'orders');
                const q = query(ordersCollection, where('createdAt', '>=', pastTimestamp));
                
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.reduce((acc, doc) => {
                    const order = doc.data();
                    if (order.createdAt && typeof order.createdAt.toDate === 'function') {
                        const date = order.createdAt.toDate().toLocaleDateString('en-CA'); // YYYY-MM-DD
                        const existingEntry = acc.find(item => item.date === date);
                        if (existingEntry) {
                            existingEntry.total += order.total;
                        } else {
                            acc.push({ date, total: order.total });
                        }
                    }
                    return acc;
                }, []).sort((a, b) => new Date(a.date) - new Date(b.date));
                
                setSalesData(data);
            } catch (err) {
                setError(err);
                console.error("Error fetching sales data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [days]);

    return { salesData, loading, error };
};

export default useSalesData;
