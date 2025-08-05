import React from 'react';
import { useStores } from '../../hooks/useStores';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const StoreTable = () => {
  const { stores, loading, error } = useStores();

  if (loading) return <p className="text-center text-gray-500">Loading stores...</p>;
  if (error) return <p className="text-center text-red-500">Error loading stores.</p>;
  if (stores.length === 0) return <p className="text-center text-gray-500">No stores found. Create one above to get started.</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Created</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{store.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {store.createdAt?.toDate ? store.createdAt.toDate().toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-800 mr-4"><FiEdit size={18} /></button>
                <button className="text-red-600 hover:text-red-800"><FiTrash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
