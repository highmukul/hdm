import AdminLayout from '../../components/admin/AdminLayout';
import UserTable from '../../components/admin/UserTable';

const AdminUsersPage = () => {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <UserTable />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUsersPage;
