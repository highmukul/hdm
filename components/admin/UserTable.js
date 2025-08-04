import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { FiTrash2, FiSearch } from 'react-icons/fi';

const UserTable = () => {
  const { users, loading, error } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user: ${userId}`);
    // Add logic to delete user
  };

  const handleChangeRole = (userId, newRole) => {
    console.log(`Changing role for user: ${userId} to ${newRole}`);
    // Add logic to update user role
  };

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error) return <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <div className="relative">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.uid, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="captain">Captain</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDeleteUser(user.uid)} className="text-red-600 hover:text-red-800">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
