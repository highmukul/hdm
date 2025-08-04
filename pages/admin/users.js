import AdminLayout from '../../components/admin/AdminLayout';
import UserTable from '../../components/admin/UserTable';

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
        <UserTable />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;