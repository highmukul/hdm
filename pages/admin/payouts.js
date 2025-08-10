import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const PayoutsPage = () => {
    const [payouts, setPayouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'payouts'), (snapshot) => {
            setPayouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleMarkAsPaid = async (payoutId) => {
        const payoutRef = doc(db, 'payouts', payoutId);
        await updateDoc(payoutRef, { status: 'paid' });
        toast.success('Payout marked as paid.');
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-8">Captain Payouts</h1>
            {loading ? <p>Loading payouts...</p> : (
                <div className="bg-white rounded-2xl shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Captain ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payouts.map(payout => (
                                <tr key={payout.id}>
                                    <td className="px-6 py-4">{payout.captainId}</td>
                                    <td className="px-6 py-4">₹{payout.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">{payout.status}</td>
                                    <td className="px-6 py-4 text-right">
                                        {payout.status === 'pending' && (
                                            <button onClick={() => handleMarkAsPaid(payout.id)} className="btn-primary">
                                                Mark as Paid
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default PayoutsPage;
