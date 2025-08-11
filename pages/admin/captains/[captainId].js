import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import AdminLayout from '../../../components/admin/AdminLayout';
import Spinner from '../../../components/ui/Spinner';
import toast from 'react-hot-toast';

const CaptainDetailsPage = () => {
    const router = useRouter();
    const { captainId } = router.query;
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!captainId) return;
        const fetchCaptain = async () => {
            setLoading(true);
            const docRef = doc(db, 'captains', captainId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCaptain({ id: docSnap.id, ...docSnap.data() });
            } else {
                toast.error('Captain not found.');
            }
            setLoading(false);
        };
        fetchCaptain();
    }, [captainId]);

    const handleUpdateStatus = async (status) => {
        const toastId = toast.loading(`Updating status to ${status}...`);
        try {
            const docRef = doc(db, 'captains', captainId);
            await updateDoc(docRef, { status });
            setCaptain(prev => ({ ...prev, status }));
            toast.success('Status updated successfully!', { id: toastId });
            router.push('/admin/captains');
        } catch (error) {
            toast.error('Failed to update status.', { id: toastId });
            console.error(error);
        }
    };

    if (loading) {
        return <AdminLayout><div className="flex justify-center items-center h-full"><Spinner /></div></AdminLayout>;
    }

    if (!captain) {
        return <AdminLayout><div>Captain details could not be loaded.</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Captain Application Review</h1>
                
                {/* Profile Section */}
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Details</h2>
                    <p><strong>Name:</strong> {captain.fullName}</p>
                    <p><strong>Email:</strong> {captain.email}</p>
                    <p><strong>Phone:</strong> {captain.phone}</p>
                    <p><strong>Address:</strong> {captain.address}</p>
                    <p><strong>Current Status:</strong> <span className={`font-bold ${
                        captain.status === 'approved' ? 'text-green-600' :
                        captain.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{captain.status}</span></p>
                </div>

                {/* Vehicle Section */}
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Vehicle Information</h2>
                    <p><strong>Model:</strong> {captain.vehicle?.model}</p>
                    <p><strong>Registration #:</strong> {captain.vehicle?.registrationNumber}</p>
                </div>

                {/* Documents Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Submitted Documents</h2>
                    <div className="flex space-x-4">
                        {captain.documents?.license && <a href={captain.documents.license} target="_blank" rel="noopener noreferrer" className="btn-secondary">View License</a>}
                        {captain.documents?.registration && <a href={captain.documents.registration} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Registration</a>}
                        {captain.documents?.insurance && <a href={captain.documents.insurance} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Insurance</a>}
                    </div>
                </div>

                {/* Actions */}
                {captain.status === 'pending' && (
                    <div className="flex justify-end space-x-4 pt-4">
                        <button onClick={() => handleUpdateStatus('rejected')} className="btn-danger">Reject Application</button>
                        <button onClick={() => handleUpdateStatus('approved')} className="btn-success">Approve Application</button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default CaptainDetailsPage;
