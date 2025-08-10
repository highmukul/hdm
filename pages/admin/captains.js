import AdminLayout from '../../components/admin/AdminLayout';
import CaptainTable from '../../components/admin/CaptainTable';
import useCaptains from '../../hooks/useCaptain';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

const AdminCaptainsPage = () => {
    const { captains, loading, error } = useCaptains();

    const handleApprove = async (id) => {
        try {
            await updateDoc(doc(db, 'captains', id), { status: 'approved' });
            toast.success('Captain approved!');
        } catch (error) {
            toast.error('Error approving captain.');
            console.error(error);
        }
    };

    const handleReject = async (id) => {
        try {
            await updateDoc(doc(db, 'captains', id), { status: 'rejected' });
            toast.success('Captain rejected!');
        } catch (error) {
            toast.error('Error rejecting captain.');
            console.error(error);
        }
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
    if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Captain Management</h1>
            <CaptainTable captains={captains} onApprove={handleApprove} onReject={handleReject} />
        </AdminLayout>
    );
};

export default AdminCaptainsPage;
