import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

const CaptainsPage = () => {
    const [captains, setCaptains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCaptain, setSelectedCaptain] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'captains'), (snapshot) => {
            const fetchedCaptains = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCaptains(fetchedCaptains);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleVerification = async (captainId, status) => {
        try {
            await updateDoc(doc(db, 'captains', captainId), { verificationStatus: status });
            
            const functions = getFunctions();
            const sendVerificationEmail = httpsCallable(functions, 'sendVerificationEmail');
            await sendVerificationEmail({ captainId, status });

            toast.success(`Captain has been ${status}.`);
            setSelectedCaptain(null);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Captain Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {loading ? <p>Loading captains...</p> : (
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* ... table headers ... */}
                            <tbody>
                                {captains.map(captain => (
                                    <tr key={captain.id} onClick={() => setSelectedCaptain(captain)} className="cursor-pointer hover:bg-gray-50">
                                        {/* ... captain data ... */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {selectedCaptain && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
                        <h2 className="text-xl font-bold mb-4">Verification Details</h2>
                        {/* ... verification details ... */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button onClick={() => handleVerification(selectedCaptain.id, 'rejected')} className="...">Reject</button>
                            <button onClick={() => handleVerification(selectedCaptain.id, 'approved')} className="...">Approve</button>
                            <button onClick={() => setSelectedCaptain(null)} className="...">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default CaptainsPage;
