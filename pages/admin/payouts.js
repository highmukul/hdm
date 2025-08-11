import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Spinner from '../../components/ui/Spinner';

const PayoutsPage = () => {
    const [captains, setCaptains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect can be enhanced to fetch captains with pending balances
        const fetchCaptains = async () => {
            setLoading(true);
            const q = query(collection(db, 'captains'), where('status', '==', 'approved'));
            const snapshot = await getDocs(q);
            // This is a simplified earnings calculation. A real app would use a more robust transaction ledger.
            const captainsWithEarnings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Placeholder for actual earnings calculation
                currentBalance: Math.random() * 5000, 
                lastPayout: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }));
            setCaptains(captainsWithEarnings);
            setLoading(false);
        };
        fetchCaptains();
    }, []);

    const handleInitiatePayout = async (captainId, amount) => {
        if (!amount || amount <= 0) {
            toast.error("Invalid payout amount.");
            return;
        }
        const toastId = toast.loading("Initiating payout...");
        try {
            await addDoc(collection(db, 'payouts'), {
                captainId,
                amount,
                status: 'paid', // Or 'processing' if there's an external payment gateway
                initiatedAt: serverTimestamp(),
            });
            // In a real app, you would also update the captain's balance here
            toast.success("Payout recorded successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to initiate payout.", { id: toastId });
            console.error("Payout Error:", error);
        }
    };
    
    // Summary Metrics
    const totalPending = captains.reduce((acc, c) => acc + c.currentBalance, 0);
    const totalPaid = 0; // Placeholder

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Captain Payouts</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 font-medium">Total Pending Payouts</h3>
                        <p className="text-3xl font-bold text-gray-800">₹{totalPending.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 font-medium">Total Paid (This Month)</h3>
                        <p className="text-3xl font-bold text-gray-800">₹{totalPaid.toFixed(2)}</p>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 font-medium">Total Captains</h3>
                        <p className="text-3xl font-bold text-gray-800">{captains.length}</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Manage Payouts</h2>
                    {loading ? <Spinner /> : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2">Captain</th>
                                        <th className="p-2">Current Balance</th>
                                        <th className="p-2">Last Payout</th>
                                        <th className="p-2 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {captains.map(captain => (
                                        <tr key={captain.id} className="border-b">
                                            <td className="p-2">{captain.fullName}</td>
                                            <td className="p-2">₹{captain.currentBalance.toFixed(2)}</td>
                                            <td className="p-2">{captain.lastPayout}</td>
                                            <td className="p-2 text-right">
                                                <button 
                                                    onClick={() => handleInitiatePayout(captain.id, captain.currentBalance)}
                                                    className="btn-primary btn-sm"
                                                    disabled={captain.currentBalance <= 0}
                                                >
                                                    Pay Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default PayoutsPage;
