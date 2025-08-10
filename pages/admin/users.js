import AdminLayout from '../../components/admin/AdminLayout';
import UserTable from '../../components/admin/UserTable';
import useAdminData from '../../hooks/useAdminData';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState } from 'react';
import toast from 'react-hot-toast';
import UserEditModal from '../../components/admin/UserEditModal';

const AdminUsersPage = () => {
    const { data: users, loading, error } = useAdminData('users');
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleSave = async (user) => {
        try {
            await updateDoc(doc(db, 'users', user.id), { role: user.role });
            toast.success('User updated!');
            setEditingUser(null);
        } catch (error) {
            toast.error('Error updating user.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteDoc(doc(db, 'users', id));
                toast.success('User deleted!');
            } catch (error) {
                toast.error('Error deleting user.');
            }
        }
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
    if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
            {editingUser && (
                <UserEditModal
                    user={editingUser}
                    onSave={handleSave}
                    onCancel={() => setEditingUser(null)}
                />
            )}
        </AdminLayout>
    );
};

export default AdminUsersPage;
