import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const PayoutHistory = () => {
    const [payouts, setPayouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'payouts'), where('captainId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                try {
                    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPayouts(list);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        }
    }, [user]);

    if (loading) return <p>Loading payout history...</p>;

    return (
        <div className="bg-white rounded-2xl shadow-sm">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {payouts.map(payout => (
                        <tr key={payout.id}>
                            <td className="px-6 py-4">₹{payout.amount.toFixed(2)}</td>
                            <td className="px-6 py-4">{payout.status}</td>
                            <td className="px-6 py-4 text-right">{payout.createdAt?.toDate().toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayoutHistory;
