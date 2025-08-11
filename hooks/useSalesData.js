import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format, eachDayOfInterval, startOfDay } from 'date-fns';

const useSalesData = (dateRange) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            if (!dateRange.startDate || !dateRange.endDate) return;

            setLoading(true);
            setError(null);
            
            try {
                // 1. Create a map of all dates in the range with 0 sales
                const dateInterval = eachDayOfInterval({
                    start: startOfDay(dateRange.startDate),
                    end: startOfDay(dateRange.endDate)
                });
                
                const salesByDate = new Map(
                    dateInterval.map(date => [format(date, 'yyyy-MM-dd'), { date: format(date, 'MMM d'), total: 0 }])
                );

                // 2. Fetch orders within the date range
                const ordersCollection = collection(db, 'orders');
                const q = query(
                    ordersCollection, 
                    where('createdAt', '>=', dateRange.startDate),
                    where('createdAt', '<=', dateRange.endDate)
                );
                
                const querySnapshot = await getDocs(q);

                // 3. Populate sales data from fetched orders
                querySnapshot.docs.forEach(doc => {
                    const order = doc.data();
                    if (order.createdAt && typeof order.createdAt.toDate === 'function') {
                        const dateStr = format(order.createdAt.toDate(), 'yyyy-MM-dd');
                        if (salesByDate.has(dateStr)) {
                            salesByDate.get(dateStr).total += order.total;
                        }
                    }
                });
                
                // 4. Convert map to array and sort
                const formattedData = Array.from(salesByDate.values())
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                setSalesData(formattedData);

            } catch (err) {
                setError(err);
                console.error("Error fetching sales data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [dateRange]);

    return { salesData, loading, error };
};

export default useSalesData;
