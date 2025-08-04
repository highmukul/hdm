import AdminLayout from '../../components/admin/AdminLayout';
import UserTable from '../../components/admin/UserTable';
import { FiPlus } from 'react-icons/fi';

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
            <button className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                <FiPlus className="mr-2" />
                Add User
            </button>
        </div>
        <UserTable />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
