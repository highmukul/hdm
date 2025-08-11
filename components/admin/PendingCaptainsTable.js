import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import Spinner from '../ui/Spinner';

const PendingCaptainsTable = () => {
    const [captains, setCaptains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingCaptains = async () => {
            try {
                const captainsRef = collection(db, 'captains');
                const q = query(
                    captainsRef,
                    where('status', '==', 'pending'),
                    orderBy('createdAt', 'desc'),
                    limit(5)
                );
                const snapshot = await getDocs(q);
                setCaptains(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching pending captains:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingCaptains();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><Spinner /></div>;
    }

    if (captains.length === 0) {
        return <p className="text-center text-gray-500 py-4">No pending captain applications.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 font-semibold">Name</th>
                        <th className="p-2 font-semibold">Email</th>
                        <th className="p-2 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {captains.map(captain => (
                        <tr key={captain.id} className="border-b">
                            <td className="p-2">{captain.fullName}</td>
                            <td className="p-2">{captain.email}</td>
                            <td className="p-2">
                                <Link href={`/admin/captains/${captain.id}`} legacyBehavior>
                                    <a className="text-indigo-600 hover:underline font-semibold">Review</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingCaptainsTable;
