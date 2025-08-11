import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import Spinner from '../ui/Spinner';

const RecentUsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                const usersRef = collection(db, 'users');
                const q = query(
                    usersRef,
                    orderBy('createdAt', 'desc'),
                    limit(5)
                );
                const snapshot = await getDocs(q);
                setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching recent users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentUsers();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><Spinner /></div>;
    }
    
    if (users.length === 0) {
        return <p className="text-center text-gray-500 py-4">No recent user signups.</p>;
    }

    return (
        <ul className="space-y-3">
            {users.map(user => (
                <li key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link href={`/admin/users/${user.id}`} legacyBehavior>
                        <a className="text-sm font-semibold text-indigo-600 hover:underline">View</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default RecentUsersList;
