import { useAdminData } from '../../hooks/useAdminData';
import { FaTrash } from 'react-icons/fa';

const UserTable = () => {
  const { users, loading, error } = useAdminData();

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user: ${userId}`);
  };
  
  const handleChangeRole = (userId, newRole) => {
    console.log(`Changing role for user: ${userId} to ${newRole}`);
  };

  if (loading) return <p className="text-text-secondary">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.uid}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{user.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleChangeRole(user.uid, e.target.value)}
                    className="input-field p-2"
                  >
                    <option value="customer">Customer</option>
                    <option value="captain">Captain</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <button onClick={() => handleDeleteUser(user.uid)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
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
