import { useState, useMemo } from 'react';
import useAdminData from '../../hooks/useAdminData';
import { UserEditModal } from './UserEditModal';

const UserTable = () => {
    const { data: users, loading, error } = useAdminData('users');
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'email', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...filteredUsers];
        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [filteredUsers, sortConfig]);
    
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedUsers, currentPage]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
             <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full dark:bg-gray-700"
            />
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('email')} className="cursor-pointer">Email</th>
                        <th onClick={() => requestSort('roles')} className="cursor-pointer">Roles</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map(user => (
                        <tr key={user.id} className="border-b dark:border-gray-700">
                            <td>{user.email}</td>
                            <td>{user.roles?.join(', ') || 'N/A'}</td>
                            <td>
                                <button onClick={() => setEditingUser(user)} className="text-blue-500">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {/* Pagination controls here */}

            {editingUser && <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} />}
        </div>
    );
};

export default UserTable;
